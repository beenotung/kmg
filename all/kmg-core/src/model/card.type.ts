import {enum_only_string} from "@beenotung/tslib";
import {Counter} from "@beenotung/tslib/uuid";
import {CycleType, Matrix} from "./shared.type";
import * as util from "util";

export enum CardType {
  action,
  profit,
  risk,
}

enum_only_string(CardType);

export enum MatrixType {
  tacitKnowledge,
  explicitKnowledge,
  marketShare,
  capital,
}

enum_only_string(MatrixType);

export interface CardEffect {
  type: MatrixType;
  /* + or - or * */
  amount: number;
}

export enum ProfitType {
  portable_profit,
  transient_profit,
}

enum_only_string(ProfitType);

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

export type ActionType = CycleType;
export let ActionType = CycleType;
export type DetailCardType = ActionType | ProfitType | CardType.risk;
export namespace DetailCardType {
  export function isCardType(cardType: CardType, detailCardType: DetailCardType): boolean {
    return (cardType === CardType.action &&
      (detailCardType === ActionType.socialization
        || detailCardType === ActionType.externalization
        || detailCardType === ActionType.combination
        || detailCardType === ActionType.internalization))
      || (cardType === CardType.profit && (detailCardType === ProfitType.transient_profit
        || detailCardType === ProfitType.portable_profit))
      || (cardType === CardType.risk && detailCardType === CardType.risk);
  }
}

export class Card {
  id = Counter.next();

  constructor(public type: DetailCardType
    , public name: string
    , public effects: CardEffect[]) {
  }

  useOn(matrix: Matrix) {
    this.effects.forEach(effect => {
      switch (CardEffect.getType(effect.amount)) {
        case CardEffectType.plus:
        case CardEffectType.minus:
          matrix[effect.type] += effect.amount;
          break;
        case CardEffectType.multiply:
          matrix[effect.type] *= effect.amount;
          break;
        default:
          throw new TypeError("unsupported effect: " + util.format(effect));
      }
    });
  }
}
