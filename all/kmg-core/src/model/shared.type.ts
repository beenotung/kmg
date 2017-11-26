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
  matrix: Matrix;
  /* start from 0, increase when finish a whole cycle */
  numberOfCycle: number = 0;

  readonly changeSubject = new Subject<MatrixState>();

  private _stage: CycleType;

  constructor(initStage: CycleType, initMatrix: Matrix) {
    this.stage = initStage;
    const _matrix = Object.assign({}, initMatrix);
    let _this = this;
    this.matrix = {
      get tacitKnowledge() {
        return _matrix.tacitKnowledge;
      },
      get explicitKnowledge() {
        return _matrix.explicitKnowledge;
      },
      get marketShare() {
        return _matrix.marketShare;
      },
      get capital() {
        return _matrix.capital;
      },

      set tacitKnowledge(x: number) {
        _matrix.tacitKnowledge = x;
        _this.changeSubject.next(_this);
      },
      set explicitKnowledge(x: number) {
        _matrix.explicitKnowledge = x;
        _this.changeSubject.next(_this);
      },
      set marketShare(x: number) {
        _matrix.marketShare = x;
        _this.changeSubject.next(_this);
      },
      set capital(x: number) {
        _matrix.capital = x;
        _this.changeSubject.next(_this);
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
