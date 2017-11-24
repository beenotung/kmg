import {MINUTE, SECOND} from "@beenotung/tslib/time";
import {Player} from "./player.type";
import {Random} from "@beenotung/tslib/random";
import {notDefined} from "@beenotung/tslib/lang";
import {Card} from "./card.type";
import {Subject} from "rxjs/Subject";
import {Targets} from "./player.data";
import {GameMap} from "./game-map.type";
import {zipArray} from "../utils-lib";

/**
 * new instance for each game-play
 * */
export class Game {
  static MaxTime = 10 * MINUTE;

  /* 2 to 4 */
  players: Player[] = [];
  currentPlayer: Player;

  gameMap = new GameMap();

  /**
   * when
   *         win -> winning player
   *   otherwise -> null
   *
   * otherwise examples:
   *   excess time limit
   *   someone give up ?
   * */
  gameOverSubject = new Subject<Player>();

  private startTime: number;
  private currentPlayerStartTime: number;

  addPlayer(player: Player) {
    this.players.push(player);
    player.roundSubject.subscribe(
      x => {
        if (x == Targets.length) {
          this.gameOverSubject.next(player);
        }
      },
      e => this.gameOverSubject.error(e),
      () => this.gameOverSubject.complete()
    );
  }

  /**
   * return first (current) player
   * */
  start() {
    this.startTime = Date.now();
    if (this.players.length <= 0) {
      throw new Error("require at least one player");
    }
    this.currentPlayer = Random.element(this.players);
    this.gameMap.initCards();
    zipArray(this.players, this.gameMap.getCorners())
      .forEach(([p, g]) => p.grid = g);
    this.currentPlayerStartTime = Date.now();
    return this.currentPlayer;
  }

  /**
   * 60..0 seconds for the current player
   *
   * if client see the value is <= zero, should call endTurn() manually
   * */
  get timeLeft(): number {
    if (notDefined(this.startTime)) {
      throw new Error("game is not started");
    }
    // return Game.MaxTime - this.startTime;
    let passed = Date.now() - this.currentPlayerStartTime;
    return 60 * SECOND - passed;
  }

  get currentBackpackCardList(): Card[] {
    return this.currentPlayer.backpack.array;
  }

  /**
   * return next player
   * */
  endTurn(): Player {
    let currentIdx = this.players.indexOf(this.currentPlayer);
    let nextIdx = (currentIdx + 1) % this.players.length;
    this.currentPlayerStartTime = Date.now();
    return this.currentPlayer = this.players[nextIdx];
  }
}
