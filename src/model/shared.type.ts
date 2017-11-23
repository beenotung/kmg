import {enum_only_string} from "@beenotung/tslib";
import * as util from "util";
import {Subject} from "rxjs/Subject";

export enum CycleType {
  socialization,
  externalization,
  combination,
  internalization,
}

enum_only_string(CycleType);

export namespace Cycle {
  export function next(x: CycleType): CycleType {
    switch (x) {
      case CycleType.socialization:
        return CycleType.externalization;
      case CycleType.externalization:
        return CycleType.combination;
      case CycleType.combination:
        return CycleType.internalization;
      case CycleType.internalization:
        return CycleType.socialization;
      default:
        throw new TypeError("undefined action type: " + util.format(x));
    }
  }

  function getStep(a: CycleType, b: CycleType) {
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
  export function isBefore(a: CycleType, b: CycleType) {
    const sa = getStep(a, b);
    const sb = getStep(b, a);
    return sa < sb;
  }
}

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

export class MatrixState {
  private readonly _matrix: Matrix;
  matrix: Matrix;
  private _stage: CycleType;
  /* start from 0, increase when finish a whole cycle */
  numberOfCycle: number = 0;

  changeSubject = new Subject<MatrixState>();

  constructor(initStage: CycleType, initMatrix: Matrix) {
    this.stage = initStage;
    this._matrix = Object.assign({}, initMatrix);
    this.matrix = {
      get tacitKnowledge() {
        return this._matrix.tacitKnowledge;
      },
      get explicitKnowledge() {
        return this._matrix.explicitKnowledge;
      },
      get marketShare() {
        return this._matrix.marketShare;
      },
      get capital() {
        return this._matrix.capital;
      },

      set tacitKnowledge(x: number) {
        this._matrix.tacitKnowledge = x;
        this.changeSubject.next(this);
      },
      set explicitKnowledge(x: number) {
        this._matrix.explicitKnowledge = x;
        this.changeSubject.next(this);
      },
      set marketShare(x: number) {
        this._matrix.marketShare = x;
        this.changeSubject.next(this);
      },
      set capital(x: number) {
        this._matrix.capital = x;
        this.changeSubject.next(this);
      },
    };
  }

  get stage() {
    return this._stage;
  }

  set stage(x: CycleType) {
    this._stage = x;
    this.changeSubject.next(this);
  }

  moveToNextStage() {
    this._stage = Cycle.next(this._stage);
    this.changeSubject.next(this);
  }
}
