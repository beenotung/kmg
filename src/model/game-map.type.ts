import {compare_number, enum_only_string, HashedArray, Random} from "@beenotung/tslib";
import {CornerIds, isConnected, MapConnections} from "./game-map.data";
import {Player} from "./player.type";
import {assert, new_even_random_enum, randomOrder} from "../utils-lib";
import {Card, CardType} from "./card.type";
import {Cards} from "./card.data";
import {Subject} from "rxjs/Subject";

/**
 * it is not responsible to represent if a player is stepping on it
 * */
export enum GridType {
  empty,
  coorperation,
  /* has card */
  action,
  /* also has card */
  random,
}

enum_only_string(GridType);

export class MapGrid {
  id: number;
  connectedList = new HashedArray<MapGrid>(x => x.id);
  players = new HashedArray<Player>(x => x.id);
  card?: Card;

  typeSubject = new Subject<GridType>();
  private _type: GridType;

  static connect(a: MapGrid, b: MapGrid) {
    a.connectedList.upsert(b);
    b.connectedList.upsert(a);
  }

  static genAll() {
    const res = new HashedArray<MapGrid>(x => x.id);
    const genGridType = new_even_random_enum<GridType>(GridType as any);
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
    });
    MapConnections.forEach(([selfID, peerIDs]) => {
      const self = res.get(selfID);
      peerIDs.forEach(peerID => MapGrid.connect(self, res.get(peerID)));
    });
    return res;
  }

  get type() {
    return this._type;
  }

  set type(x: GridType) {
    this._type = x;
    this.typeSubject.next(x);
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

  getCorners(): MapGrid[] {
    return [
      this.grids.get(1),
      this.grids.get(11),
      this.grids.get(101),
      this.grids.get(112),
    ];
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
    const card = dest.card;
    if (card) {
      this.takeCardFromMap(card);
      player.backpack.insert(card);
    }
  }

  initCards() {
    this.newCards.clear();
    this.onMapCards.clear();
    this.holdingCards.clear();
    this.usedCards.clear();
    Cards.forEach(card => this.newCards.insert(card));

    this.grids.array.forEach((grid: MapGrid) => {
      /* skip corners */
      if (CornerIds.indexOf(grid.id) != -1) {
        return;
      }

      /* random to have card */
      if (Random.nextBool()) {
        return;
      }

      for (; ;) {
        /* random to pick grid type */
        const gridType = Random.nextEnum<GridType>(GridType as any);
        if (gridType == GridType.empty) {
          continue;
        }
        grid.type = gridType;

        if (gridType !== GridType.action) {
          break;
        }

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
    grid.card = card;
    this.cardEventSubject.next({type: "appear", card, grid});
  }

  /**
   * e.g. move card from map to player's backpack
   * */
  takeCardFromMap(currentCard: Card) {
    this.onMapCards.remove(currentCard);
    this.holdingCards.insert(currentCard);
    const currentGrid = this.cardLocations.get(currentCard);
    this.cardLocations.delete(currentCard);
    delete currentGrid.card;
    currentGrid.type = GridType.empty;
    this.cardEventSubject.next({type: "disappear", card: currentCard, grid: currentGrid});
    const grids = randomOrder(this.grids.array);
    for (; ;) {
      const grid = Random.element(grids);
      if (grid == currentGrid || grid.players.array.length != 0 || grid.type !== GridType.empty) {
        continue;
      }
      const cards = this.newCards.array.length > 0 ? this.newCards : this.usedCards;
      const sameTypeCards = cards.array.filter(x => x.type = currentCard.type);
      for (; ;) {
        const card = Random.element(cards.array);
        if (sameTypeCards.length > 0 && card.type != currentCard.type) {
          continue;
        }
        return this.placeCardOnMap(card, grid);
      }
    }
  }
}
