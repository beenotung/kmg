import {BaseDBObject} from "./base-db-object";
import {enum_only_string} from "@beenotung/tslib/src/enum";
import {registryTable} from "../../providers/database-service/tables";

export enum SMSType {
}

enum_only_string(SMSType);

export enum SMSStatus {
  sending, skipped
}

enum_only_string(SMSStatus);

export class SMSNotice extends BaseDBObject {
  static _send_time = "send_time";

  type: SMSType;
  type_id: string;
  status;
  send_time: number;
  /* receiver */
  user_id: string;
}

registryTable(SMSNotice, "SMSNotice");
