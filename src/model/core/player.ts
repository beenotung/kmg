import {Counter, isNumberType, notDefined, Random} from "@beenotung/tslib";
import {assert} from "../../utils-lib";
import {MapGrid} from "./game-map.type";
import {HashedArray} from "@beenotung/tslib/hashed-array";
import {ActionType, Card} from "./card.type";
import {CompanyType} from "./company.type";
import {InitialMatrixMap} from "./company.data";
import {MatrixState} from "./shared.type";

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
    const m = InitialMatrixMap.get(type);
    if (notDefined(m)) {
      throw new Error("unsupported company type: " + type);
    }
    this.current = Object.assign({
      stage: Random.nextEnum(ActionType) as any as ActionType
      , numberOfCycle: 0
    }, m);
  }

  get hasReachTarget(): boolean {
    if (this.current.numberOfCycle < this.target.numberOfCycle) {
      return false;
    }
    if (this.current.numberOfCycle == this.target.numberOfCycle) {
      return ActionType.isBefore(this.target.stage, this.current.stage);
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
    card.type;
    this.backpack.remove(card);
  }
}
