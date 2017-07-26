import {BaseDBObject} from "./base-db-object";
import {registryTable} from "../../providers/database-service/tables";
import {Role} from "../data/role";

export class BugReport extends BaseDBObject {
  api_response: {
    error_code: string;
    reason?: any;
    data?: any;
  };
  error: {
    name: string;
    message: string;
    stack?: string;
  };
  data: any;

  role: Role | "";
}

registryTable(BugReport, "BugReport");
