import {BaseDBObject} from "./base-db-object";
import {registryTable} from "../../providers/database-service/tables";
import {DataType} from "typestub-horizon-client";

/**
 * the account root object
 * */
export class User extends BaseDBObject {
  id: string;
  [key: string]: DataType;

  /* reserved */
  referer_id?: string;
}

registryTable(User, "User");
