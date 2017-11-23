import {enum_only_string} from "@beenotung/tslib";
import {Counter} from "@beenotung/tslib/uuid";

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

export enum MatrixType {
  tacitKnowledge,
  explicitKnowledge,
  marketShare,
  captial,
}

enum_only_string(MatrixType);

export enum CardEffectType {
  plus, minus, multiply
}

export enum ProfitType {
  portable_profit,
  transient_profit,
}

enum_only_string(ProfitType);
enum_only_string(CardEffectType);

export namespace CardEffect {
  export function getType(amount: number): CardEffectType {
    return Math.round(amount) === amount
      ? (amount > 0 ? CardEffectType.plus : CardEffectType.minus)
      : CardEffectType.multiply
      ;
  }
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

export class Card {
  id = Counter.next();

  constructor(public type: ActionType | ProfitType | CardType.risk
    , public name: string
    , public effects: CardEffect[]) {
  }
}
