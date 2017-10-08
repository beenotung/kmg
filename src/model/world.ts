/**
 * new instance for each game-play
 * */
import {HashedArray, not_impl} from "@beenotung/tslib";

export class Game {
  /* 2 to 4 */
  players: Player[];
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

export class Player {
}
