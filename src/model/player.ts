import {Counter, isNumberType, notDefined, Random} from "@beenotung/tslib";
import {assert} from "../utils-lib";
import {MapGrid} from "./game-map.type";
import {HashedArray} from "@beenotung/tslib/hashed-array";
import {ActionType, Card} from "./card.type";
import {CompanyType} from "./company.type";
import {InitialMatrixMap} from "./company.data";
import {Cycle, CycleType, MatrixState} from "./shared.type";

export class Player {
  id = Counter.next();
  name: string;

  companyType: CompanyType;
  current: MatrixState;
  target: MatrixState;
  grid: MapGrid;

  backpack = new HashedArray<Card>(x => x.id);

  constructor(type: CompanyType) {
    this.companyType = type;
    const initialMatrix = InitialMatrixMap.get(type);
    if (notDefined(initialMatrix)) {
      throw new Error("unsupported company type: " + type);
    }
    this.current = new MatrixState(Random.nextEnum(ActionType) as any as CycleType, initialMatrix);
  }

  get hasReachTarget(): boolean {
    if (this.current.numberOfCycle < this.target.numberOfCycle) {
      return false;
    }
    if (this.current.numberOfCycle == this.target.numberOfCycle) {
      return Cycle.isBefore(this.target.stage, this.current.stage);
    } else {
      /* current > target */
      return true;
    }
  }

  startRound(target: MatrixState) {
    assert(target && target.stage && isNumberType(this.target.numberOfCycle), "argument target:MatrixState is required");
    this.target = target;
  }

  useCard(card: Card) {
    if (!this.backpack.has(card.id)) {
      throw new Error("player do not own this card");
    }
    if (card.type !== this.current.stage) {
      throw new Error(`the card do not match player current stage, player: ${this.current.stage}, card: ${card.type}`);
    }
    card.useOn(this.current.matrix);
    this.current.moveToNextStage();
    this.backpack.remove(card);
  }

  getMovableGrids(): MapGrid[] {
    return this.grid.connectedList.array.filter((x: MapGrid) => x.players.array.length == 0);
  }
}
