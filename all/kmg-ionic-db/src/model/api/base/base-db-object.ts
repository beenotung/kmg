// export declare class BaseDbObject {
//   constructor(never: never);
// }

export interface BaseDBObject {

  id?: string;
  /*
  * mainly for audit, do not relay on it for business logic
  * */
  create_time: number;
  /* user id */
  creator_id: string;
  /* reserved */
  edit_time: number;
  editor_id: string;
  delete_date: number;
  delete_user_id: string;
  delete_reason: string;

}

export namespace BaseDBObject {
  export const _create_time = "create_time";
  export const _toData = "toData";

  export function init(): BaseDBObject {
    return {
      create_time: Date.now()
      , creator_id: ""
      , edit_time: 0
      , editor_id: ""
      , delete_date: 0
      , delete_user_id: ""
      , delete_reason: ""
    };
  }
}
