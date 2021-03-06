import {compare_number, enum_only_string, HashedArray, Random} from "@beenotung/tslib";
import {CornerIds, isConnected, MapConnections} from "./game-map.data";
import {Player} from "./player.type";
import {assert, new_even_random_enum, randomOrder} from "../utils-lib";
import {ActionType, Card, CardType, DetailCardType, ProfitType} from "./card.type";
import {Cards} from "./card.data";
import {Subject} from "rxjs/Subject";
import * as util from "util";

/**
 * it is not responsible to represent if a player is stepping on it
 * */
export enum GridType {
  empty,
  cooperation,
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

    let randomGridType = new_even_random_enum<GridType>(GridType as any);
    let randomCardType = new_even_random_enum<CardType>(CardType as any);

    randomOrder(this.grids.array).forEach(grid => {
      /* skip corners */
      if (CornerIds.indexOf(grid.id) != -1) {
        return;
      }

      gridType:
        for (; ;) {
          /* random to pick grid type */
          let gridType: GridType = randomGridType.next();

          /* check if no card */
          if (gridType === GridType.empty || gridType === GridType.cooperation) {
            if (gridType === GridType.cooperation) {
              /* skip for now TODO support cooperation later on */
              continue;
            }
            grid.type = gridType;
            return;
          }

          if (gridType !== GridType.action && gridType !== GridType.random) {
            throw new Error("unexpected gridType: " + gridType);
          }
          if (this.newCards.array.length == 0) {
            // console.debug("try another grid type without card");
            continue;
          }
          for (; ;) {
            /* random to pick card type */
            let cardType = gridType === GridType.action ? CardType.action : randomCardType.next();

            /* random to pick card content */
            const matchedCards: Card[] = this.newCards.array.filter((card: Card) => DetailCardType.isCardType(cardType, card.type));
            if (matchedCards.length == 0) {
              if (gridType === GridType.action) {
                // console.debug("try another grid type");
                continue gridType;
              }
              /* try another card type */
              // console.debug("try another card type");
              continue;
            }
            const card = Random.element<Card>(matchedCards);
            this.newCards.remove(card);
            this.placeCardOnMap(card, grid);
            break;
          }
        }
    });
    // console.log("finished init cards on map");
  }

  placeCardOnMap(card: Card, grid: MapGrid) {
    this.onMapCards.insert(card);
    this.cardLocations.set(card, grid);
    grid.card = card;
    switch (card.type) {
      case CardType.risk:
      case ProfitType.transient_profit:
      case ProfitType.portable_profit:
        grid.type = GridType.random;
        break;
      case ActionType.socialization:
      case ActionType.externalization:
      case ActionType.combination:
      case ActionType.internalization:
        grid.type = GridType.action;
        break;
      default:
        throw new TypeError("unknown grid type from card: " + util.format(card));
    }
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
    /* add new card to map */
    const grids = randomOrder(this.grids.array);
    for (; ;) {
      const grid = Random.element(grids);
      if (grid == currentGrid || grid.players.array.length != 0 || grid.type !== GridType.empty) {
        continue;
      }
      const cards = this.newCards.array.length > 0 ? this.newCards : this.usedCards;
      if (cards.array.length == 0) {
        /* no available cards */
        return;
      }
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
