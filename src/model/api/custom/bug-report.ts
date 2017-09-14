import {BaseDBObject} from "../base/base-db-object";
import {registryTable} from "../tables";
import {isDefined} from "@beenotung/tslib/lang";
import {DataType} from "typestub-horizon-client";

export declare class BugReport implements BaseDBObject {
  constructor(never: never);
}

export interface APIResponseDB {
  error_code: string;
  reason?: any;
  data?: any;
}

export interface BugReport extends BaseDBObject {
  api_response?: APIResponseDB
  error: {
    name: string;
    message: string;
    stack?: string;
  };
  data?: DataType;

  device_id: string;
}

export namespace BugReport {
  export const tableName = "BugReport";

  export function init(deviceID: string, error = new Error(), dataOrApiResponse?: APIResponseDB | DataType): BugReport {
    console.debug.bind(null, "creating bug report").apply(null, arguments);
    const bugReport = <BugReport> BaseDBObject.init();
    bugReport.device_id = deviceID;
    bugReport.error = error;
    if (isDefined(dataOrApiResponse)) {
      const apiResponse: APIResponseDB = <any> dataOrApiResponse;
      if (isDefined(apiResponse.error_code)) {
        bugReport.api_response = apiResponse;
      } else {
        bugReport.data = <DataType> dataOrApiResponse;
      }
    }
    return bugReport;
  }
}

registryTable(BugReport);
