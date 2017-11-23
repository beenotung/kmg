import {MINUTE} from "@beenotung/tslib/time";
import {Player} from "./player";
import {Random} from "@beenotung/tslib/random";
import {notDefined} from "@beenotung/tslib/lang";
import {Card} from "./card.type";

/**
 * new instance for each game-play
 * */
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

  get currentBackpackCardList(): Card[] {
    return this.currentPlayer.backpack.array;
  }
}

/**
 * each game has three rounds
 * */
export class Round {
  roundNum: number;
}
