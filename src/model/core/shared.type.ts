import {MINUTE, notDefined, Random} from "@beenotung/tslib";
import {ActionType} from "./card.type";

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
