import {MINUTE} from "@beenotung/tslib/time";
import {Player} from "./player.type";
import {Random} from "@beenotung/tslib/random";
import {notDefined} from "@beenotung/tslib/lang";
import {Card} from "./card.type";
import {Subject} from "rxjs/Subject";
import {Targets} from "./player.data";
import {GameMap} from "./game-map.type";

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
    /* TODO send players to the corner of the map */
    return this.currentPlayer;
  }

  get timeLeft(): number {
    if (notDefined(this.startTime)) {
      throw new Error("game is not started");
    }
    return Game.MaxTime - this.startTime;
  }

  get currentBackpackCardList(): Card[] {
    return this.currentPlayer.backpack.array;
  }
}
