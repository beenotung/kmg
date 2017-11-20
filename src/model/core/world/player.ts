import {Counter, isNumberType, notDefined, Random} from "@beenotung/tslib";
import {assert} from "../../../utils-lib";
import {ActionType, CompanyType, MatrixState} from "./world.type";
import {InitialMatrixMap} from "./world.data";
import {MapGrid} from "./game-map.type";

export class Player {
  id = Counter.next();
  name: string;

  companyType: CompanyType;
  current: MatrixState;
  target: MatrixState;
  grid: MapGrid;

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
