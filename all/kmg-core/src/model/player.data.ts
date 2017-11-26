import {Matrix} from "./shared.type";

export type Target = Matrix;
/**
 * index is round, start from 0
 *
 * Angel Investment -> 0
 * Series A         -> 1
 * Series B         -> 2
 * Series C         -> 3
 * */
export const Targets: Target[] = [
  {tacitKnowledge: 80, explicitKnowledge: 20, marketShare: 0, capital: 0},
  {tacitKnowledge: 70, explicitKnowledge: 50, marketShare: 10, capital: 10},
  {tacitKnowledge: 60, explicitKnowledge: 70, marketShare: 25, capital: 15},
  {tacitKnowledge: 50, explicitKnowledge: 100, marketShare: 30, capital: 20},
];

/**
 * [0] Angel Investment -> + $ 5.0  M
 * [1] Series A         -> + $ 10.0 M
 * [2] Series B         -> + $ 15.0 M
 * [3] Series C         -> + $ 20.0 M
 * */
export const TargetRewards: number[] = [
  5
  , 10
  , 15
  , 20
];
