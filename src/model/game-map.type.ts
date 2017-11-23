import {compare_number, enum_only_string, HashedArray, Random} from "@beenotung/tslib";
import {isConnected, MapConnections} from "./game-map.data";
import {Player} from "./player.type";
import {assert, new_even_random_enum} from "../utils-lib";
import {ActionType, Card, CardType} from "./card.type";
import {Cards} from "./card.data";
import {Subject} from "rxjs/Subject";

export enum GridType {
  action,
  coorperation,
  random,
}

enum_only_string(GridType);

export class MapGrid {
  id: number;
  connectedList = new HashedArray<MapGrid>(x => x.id);
  /**@deprecated*/
  type: GridType;
  /* only if this.type === GridType.action */
  actionType?: ActionType;
  players = new HashedArray<Player>(x => x.id);
  cards = new HashedArray<Card>(x => x.id);

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

export type CardEventType = "appear" | "disappear";

export interface CardEvent {
  type: CardEventType;
  card: Card;
  grid: MapGrid;
}

export class GameMap {
  grids: HashedArray<MapGrid>;

  newCards = new HashedArray<Card>(x => x.id);
  onMapCards = new HashedArray<Card>(x => x.id);
  holdingCards = new HashedArray<Card>(x => x.id);
  usedCards = new HashedArray<Card>(x => x.id);

  cardEventSubject = new Subject<CardEvent>();

  private cardLocations = new Map<Card, MapGrid>();

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
    dest.cards.array.forEach(card => {
      this.takeCardFromMap(card);
      player.backpack.insert(card);
    });
  }

  initCards() {
    this.newCards.clear();
    this.onMapCards.clear();
    this.holdingCards.clear();
    this.usedCards.clear();
    Cards.forEach(card => this.newCards.insert(card));

    this.grids.array.forEach((grid: MapGrid) => {
      /* random to have card */
      if (Random.nextBool()) {
        return;
      }

      for (; ;) {
        /* random to pick card type */
        const cardType = Random.nextEnum<CardType>(CardType as any);

        /* random to pick card content */
        const matchedCards = this.newCards.array.filter((card: Card) => card.type == cardType);
        if (matchedCards.length == 0) {
          /* try another card type */
          continue;
        }
        const card = Random.element(matchedCards);
        this.newCards.remove(card);
        this.placeCardOnMap(card, grid);
      }
    });
  }

  placeCardOnMap(card: Card, grid: MapGrid) {
    this.onMapCards.insert(card);
    this.cardLocations.set(card, grid);
    grid.cards.insert(card);
    this.cardEventSubject.next({type: "appear", card, grid});
  }

  /**
   * e.g. move card from map to player's backpack
   * */
  takeCardFromMap(card: Card) {
    this.onMapCards.remove(card);
    this.holdingCards.insert(card);
    const grid = this.cardLocations.get(card);
    this.cardLocations.delete(card);
    grid.cards.remove(card);
    this.cardEventSubject.next({type: "disappear", card, grid});
    /* TODO pick a new card to put else where */
  }
}
