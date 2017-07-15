import {DataType, OldRecord} from '../../../lib/typestub-horizon-client/index';

export abstract class BaseDBObject implements OldRecord {
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
  delete_user_id: string = '';
  delete_reason: string;
}
