/**
 * new instance for each game-play
 * */
import {HashedArray, MINUTE, not_impl, notDefined, Random} from "@beenotung/tslib";
import {InitialMatrixMap} from "./world.data";

export class Game {
  /* 2 to 4 */
  players: Player[] = [];
  static MaxTime = 10 * MINUTE;
  private startTime: number;
  currentPlayer: Player;

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
    //TODO init grids
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

export enum ActionType {
  socialization,
  externalization,
  combination,
  internalization,
}

export interface CardEffect {
  type: MatrixType;
  amount: number;
}

export class Card {
  constructor(public type: ActionType
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

export enum MatrixType {
  tacitKnowledge,
  explicitKnowledge,
  marketShare,
  captial,
}

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
  matrix: Matrix;

  constructor(type: CompanyType) {
    this.matrix = InitialMatrixMap.get(type);
    if (notDefined(this.matrix)) {
      throw new Error("unsupported company type: " + type);
    }
  }
}
