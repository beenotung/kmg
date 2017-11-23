import {Counter, notDefined, Random} from "@beenotung/tslib";
import {MapGrid} from "./game-map.type";
import {HashedArray} from "@beenotung/tslib/hashed-array";
import {ActionType, Card} from "./card.type";
import {CompanyType} from "./company.type";
import {InitialMatrixMap} from "./company.data";
import {CycleType, Matrix, MatrixState} from "./shared.type";
import {Subject} from "rxjs/Subject";
import {targets} from "./player.data";

/**
 * Angel Investment -> 0
 * Series A         -> 1
 * Series B         -> 2
 * Series C         -> 3
 *
 * */
export type PlayerRound = 0 | 1 | 2 | 3;

export class Player {
  id = Counter.next();
  name: string;

  companyType: CompanyType;
  readonly current: MatrixState;
  grid: MapGrid;

  backpack = new HashedArray<Card>(x => x.id);

  round: PlayerRound;
  roundSubject = new Subject<PlayerRound>();

  constructor(type: CompanyType) {
    this.companyType = type;
    const initialMatrix = InitialMatrixMap.get(type);
    if (notDefined(initialMatrix)) {
      throw new Error("unsupported company type: " + type);
    }
    this.current = new MatrixState(Random.nextEnum(ActionType) as any as CycleType, initialMatrix);
    this.current.changeSubject.subscribe(
      x => {
        const m = this.current.matrix;
        const t = this.target;
        const passed = m.tacitKnowledge >= t.tacitKnowledge
          && m.explicitKnowledge >= t.explicitKnowledge
          && m.marketShare >= t.marketShare
          && m.capital >= t.capital;
        if (passed) {
          this.round++;
          this.roundSubject.next(this.round as PlayerRound);
        }
      },
      e => this.roundSubject.error(e),
      () => this.roundSubject.complete()
    );
  }

  get target(): Matrix {
    return targets[this.round];
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
