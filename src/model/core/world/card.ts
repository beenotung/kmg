import {enum_only_string} from "@beenotung/tslib";
import {ActionType, MatrixType, ProfitType} from "./world.type";

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
