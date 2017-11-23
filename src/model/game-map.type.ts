import {compare_number, enum_only_string, HashedArray, Random} from "@beenotung/tslib";
import {isConnected, MapConnections} from "./game-map.data";
import {Player} from "./player";
import {assert, new_even_random_enum} from "../utils-lib";
import {ActionType, Card} from "./card.type";

export enum GridType {
  action,
  coorperation,
  random,
}

enum_only_string(GridType);

export class MapGrid {
  id: number;
  connectedList = new HashedArray<MapGrid>(x => x.id);
  type: GridType;
  /* only if this.type === GridType.action */
  actionType?: ActionType;
  players = new HashedArray<Player>(x => x.id);

  newCards = new HashedArray<Card>(x => x.id);
  onMapCards = new HashedArray<Card>(x => x.id);
  holdingCards = new HashedArray<Card>(x => x.id);
  usedCards = new HashedArray<Card>(x => x.id);

  static connect(a: MapGrid, b: MapGrid) {
    a.connectedList.upsert(b);
    b.connectedList.upsert(a);
  }

  static genAll() {
    const res = new HashedArray<MapGrid>(x => x.id);
    const genGridType = new_even_random_enum<GridType>(GridType as any);
    const genActionType = new_even_random_enum<ActionType>(ActionType as any);
    /* [id, random] */
    const orders: Array<[number, number]> = [];
    MapConnections.forEach(([id]) => {
      const x = new MapGrid();
      x.id = id;
      orders.push([id, Random.nextInt()]);
      res.insert(x);
    });
    orders.sort(([a, random_a], [b, random_b]) => compare_number(random_a, random_b));
    orders.forEach(([id]) => {
      const x = res.get(id);
      x.type = genGridType.next();
      if (x.type === GridType.action) {
        x.actionType = genActionType.next();
      }
    });
    MapConnections.forEach(([selfID, peerIDs]) => {
      const self = res.get(selfID);
      peerIDs.forEach(peerID => MapGrid.connect(self, res.get(peerID)));
    });
    return res;
  }
}

export class GameMap {
  grids: HashedArray<MapGrid>;

  constructor() {
    this.grids = MapGrid.genAll();
  }

  canMove(src: MapGrid, dest: MapGrid): boolean {
    return isConnected(src.id, dest.id);
  }

  move(player: Player, dest: MapGrid) {
    assert(!!player.grid, "player not on map");
    assert(this.canMove(player.grid, dest), "invalid move");
    player.grid.players.remove(player);
    player.grid = dest;
    dest.players.upsert(player);
  }
}
