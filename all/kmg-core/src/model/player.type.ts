import {Counter, notDefined, Random} from "@beenotung/tslib";
import {MapGrid} from "./game-map.type";
import {HashedArray} from "@beenotung/tslib/hashed-array";
import {ActionType, Card, CardType, DetailCardType, ProfitType} from "./card.type";
import {CompanyType} from "./company.type";
import {InitialMatrixMap} from "./company.data";
import {CycleType, Matrix, MatrixState} from "./shared.type";
import {Subject} from "rxjs/Subject";
import {TargetRewards, Targets} from "./player.data";
import {InvestmentGridID} from "./game-map.data";

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

  round: PlayerRound = 0;
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
        if (this.hasMetTarget() && this.grid.id == InvestmentGridID) {
          this.current.matrix.capital += TargetRewards[this.round];
          this.round++;
          this.roundSubject.next(this.round as PlayerRound);
        }
      },
      e => this.roundSubject.error(e),
      () => this.roundSubject.complete()
    );
  }

  hasMetTarget(): boolean {
    const m = this.current.matrix;
    const t = this.target;
    return m.tacitKnowledge >= t.tacitKnowledge
      && m.explicitKnowledge >= t.explicitKnowledge
      && m.marketShare >= t.marketShare
      && m.capital >= t.capital;
  }

  get target(): Matrix {
    return Targets[this.round];
  }

  useCard(card: Card) {
    if (!this.backpack.has(card.id)) {
      throw new Error("player do not own this card");
    }
    if (!this.canUseCard(card.type)) {
      throw new Error(`the card do not match player current stage, player: ${this.current.stage}, card: ${card.type}`);
    }
    card.useOn(this.current.matrix);
    if (card.type === this.current.stage) {
      this.current.moveToNextStage();
    }
    this.backpack.remove(card);
  }

  canUseCard(cardType: DetailCardType) {
    switch (cardType) {
      case CardType.risk:
      case ProfitType.transient_profit:
      case ProfitType.portable_profit:
      case this.current.stage:
        return true;
      default:
        return false;
    }
  }

  getMovableGrids(): MapGrid[] {
    return this.grid.connectedList.array
      .filter((x: MapGrid) => x.players.array.length == 0)
      .filter((x: MapGrid) => x.id !== InvestmentGridID || this.hasMetTarget())
      ;
  }
}
