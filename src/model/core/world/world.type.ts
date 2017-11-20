/**
 * new instance for each game-play
 * */
import {enum_only_string, HashedArray, isNumberType, MINUTE, not_impl, notDefined, Random} from "@beenotung/tslib";
import {InitialMatrixMap} from "./world.data";
import {assert} from "../../../utils";

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
}

/**
 * each game has three rounds
 * */
export class Round {
  roundNum: number;
}

export enum ActionType {
  socialization,
  externalization,
  combination,
  internalization,
}

enum_only_string(ActionType);

export namespace ActionType {
  export function next(a: ActionType) {
    switch (a) {
      case ActionType.socialization:
        return ActionType.externalization;
      case ActionType.externalization:
        return ActionType.combination;
      case ActionType.combination:
        return ActionType.internalization;
      case ActionType.internalization:
        return ActionType.socialization;
      default:
        throw new TypeError("undefined action type: " + a);
    }
  }

  function getStep(a: ActionType, b: ActionType) {
    let step = 0;
    for (; ;) {
      if (a === b) {
        return step;
      }
      step++;
      a = next(a);
    }
  }

  /**
   * return true if a is before b
   * */
  export function isBefore(a: ActionType, b: ActionType) {
    const sa = getStep(a, b);
    const sb = getStep(b, a);
    return sa < sb;
  }

}

export enum ProfitType {
  portable_profit,
  transient_profit,
}

export enum CardType {
  action,
  profit,
  risk,
}

enum_only_string(CardType);

export interface CardEffect {
  type: MatrixType;
  /* + or - or * */
  amount: number;
}

export enum CardEffectType {
  plus, minus, multiply
}

enum_only_string(CardEffectType);

export namespace CardEffect {
  export function getType(amount: number): CardEffectType {
    return Math.round(amount) === amount
      ? (amount > 0 ? CardEffectType.plus : CardEffectType.minus)
      : CardEffectType.multiply
      ;
  }
}

export class Card {
  constructor(public type: ActionType | ProfitType | CardType.risk
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

enum_only_string(CompanyType);

export enum MatrixType {
  tacitKnowledge,
  explicitKnowledge,
  marketShare,
  captial,
}

enum_only_string(MatrixType);

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

export interface MatrixState extends Matrix {
  stage: ActionType;
  /* start from 0 */
  numberOfCycle: number;
}

export class Player {
  name: string;

  companyType: CompanyType;
  current: MatrixState;
  target: MatrixState;

  constructor(type: CompanyType) {
    this.companyType = type;
    const m = InitialMatrixMap.get(type);
    if (notDefined(m)) {
      throw new Error("unsupported company type: " + type);
    }
    this.current = Object.assign({
      stage: Random.nextEnum(ActionType) as any as ActionType
      , numberOfCycle: 0
    }, m);
  }

  get hasReachTarget(): boolean {
    if (this.current.numberOfCycle < this.target.numberOfCycle) {
      return false;
    }
    if (this.current.numberOfCycle == this.target.numberOfCycle) {
      return ActionType.isBefore(this.target.stage, this.current.stage);
    } else {
      /* current > target */
      return true;
    }
  }

  startRound(target: MatrixState) {
    assert(target && target.stage && isNumberType(this.target.numberOfCycle), "argument target:MatrixState is required");
    this.target = target;
  }
}
