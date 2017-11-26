import {MINUTE, SECOND} from "@beenotung/tslib/time";
import {Player} from "./player.type";
import {Random} from "@beenotung/tslib/random";
import {notDefined} from "@beenotung/tslib/lang";
import {Card} from "./card.type";
import {Subject} from "rxjs/Subject";
import {Targets} from "./player.data";
import {GameMap} from "./game-map.type";
import {zipArray} from "../utils-lib";

export let hack = {
  jetMe: () => {
    console.log("hack is not ready");
  }
};
window.addEventListener("message", (ev) => {
  if (ev.data == "hack") {
    hack.jetMe();
  }
}, false);

/**
 * new instance for each game-play
 * */
export class Game {
  static MaxTime = 10 * MINUTE;

  /* 2 to 4 */
  players: Player[] = [];

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

  movableGridListSubject = new Subject();

  private startTime: number;
  private currentPlayerStartTime: number;

  private _currentPlayer: Player;
  get currentPlayer(): Player {
    return this._currentPlayer;
  }

  set currentPlayer(x: Player) {
    this._currentPlayer = x;
    this.currentPlayerStartTime = Date.now();
    this.movableGridListSubject.next(x.getMovableGrids());
  }

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
    this.gameMap.initCards();
    zipArray(this.players, this.gameMap.getCorners())
      .forEach(([p, g]) => p.grid = g);
    this.currentPlayer = Random.element(this.players);
    hack.jetMe = () => {
      const m = this.currentPlayer.current.matrix;
      m.tacitKnowledge *= 1.2;
      m.explicitKnowledge *= 1.2;
      m.marketShare *= 1.2;
      m.capital *= 1.2;
    };
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
    const passed = Date.now() - this.currentPlayerStartTime;
    return 60 * SECOND - passed;
  }

  get currentBackpackCardList(): Card[] {
    return this.currentPlayer.backpack.array;
  }

  /**
   * return next player
   * */
  endTurn(): Player {
    const currentIdx = this.players.indexOf(this.currentPlayer);
    const nextIdx = (currentIdx + 1) % this.players.length;
    return this.currentPlayer = this.players[nextIdx];
  }
}
