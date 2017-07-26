import {DataType, OldRecord} from "typestub-horizon-client";

export abstract class BaseDBObject implements OldRecord {
  static _create_time = "create_time";

  id: string;
  [key: string]: DataType;

  /*
  * mainly for audit, do not relay on it for business logic
  * */
  create_time: number = Date.now();
  /* user id */
  creator_id: string;
  /* reserved */
  edit_time: number;
  editor_id: string;
  delete_date: number = 0;
  delete_user_id: string = "";
  delete_reason: string;
}

export function genSearch<A extends BaseDBObject>(): A {
  const res = <A>{};
  res.delete_date = 0;
  return res;
}
