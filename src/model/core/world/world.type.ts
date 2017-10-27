/**
 * new instance for each game-play
 * */
import {enum_only_string, HashedArray, MINUTE, not_impl, notDefined, Random} from "@beenotung/tslib";
import {InitialMatrixMap} from "./world.data";

export class Game {
  static MaxTime = 10 * MINUTE;

  /* 2 to 4 */
  players: Player[] = [];
  currentPlayer: Player;

  private startTime: number;

  addPlayer(player: Player) {
    this.players.push(player);
  }

  start() {
    this.startTime = Date.now();
    if (this.players.length <= 0) {
      throw new Error("require at least one player");
    }
    this.currentPlayer = Random.element(this.players);
  }

  get timeLeft(): number {
    if (notDefined(this.startTime)) {
      throw new Error("game is not started");
    }
    return Game.MaxTime - this.startTime;
  }
}

/**
 * each game has three rounds
 * */
export class Round {
  roundNum: number;
}

export class GameMap {
  grids = new HashedArray<MapGrid>(x => x.id);

  constructor() {
    // TODO init grids
  }

  canMove(src: MapGrid, dest: MapGrid): boolean {
    return not_impl();
  }
}

export class MapGrid {
  id: number;
  connectedList = new HashedArray<MapGrid>(x => x.id);
  type: GridType;

  static connect(a: MapGrid, b: MapGrid) {
    a.connectedList.upsert(b);
    b.connectedList.upsert(a);
  }
}

export enum GridType {
  action,
  coorperation,
  random,
}

enum_only_string(GridType);

export enum ActionType {
  socialization,
  externalization,
  combination,
  internalization,
}

enum_only_string(ActionType);

export enum CardType {
  socialization,
  externalization,
  combination,
  internalization,
  profit_portable,
  profit_transient,
  risk,
}

enum_only_string(CardType);

export interface CardEffect {
  type: MatrixType;
  /* + or - or * */
  amount: number;
}

export enum CardEffectType {
  plus, minus, multiply
}

enum_only_string(CardEffectType);

export namespace CardEffect {
  export function getType(amount: number): CardEffectType {
    return Math.round(amount) === amount
      ? (amount > 0 ? CardEffectType.plus : CardEffectType.minus)
      : CardEffectType.multiply
      ;
  }
}

export class Card {
  constructor(public type: CardType | ActionType
    , public name: string
    , public effects: CardEffect[]) {
  }
}

export enum CompanyType {
  Publishing,
  MediaFirm,
  ITCompany,
  Education,
}

enum_only_string(CompanyType);

export enum MatrixType {
  tacitKnowledge,
  explicitKnowledge,
  marketShare,
  captial,
}

enum_only_string(MatrixType);

export interface Matrix {
  /* percentage to max (times 100) */
  tacitKnowledge: number;
  /* percentage to max (times 100) */
  explicitKnowledge: number;
  /* percentage */
  marketShare: number;
  /* in unit of $M */
  capital: number;
}

export class Player {
  name: string;

  companyType: CompanyType;
  current: Matrix;
  target: Matrix;

  constructor(type: CompanyType) {
    this.companyType = type;
    const m = this.current = InitialMatrixMap.get(type);
    if (notDefined(m)) {
      throw new Error("unsupported company type: " + type);
    }
  }
}
