import {BaseDBObject} from "./base-db-object";
import {registryTable} from "../../providers/database-service/tables";

export class Config extends BaseDBObject {
  /* common backend */
  db_version: string;

  /* for client app */
  client_version: string;

  /* for admin panel */
  admin_version: string;

  /* for SMS hub */
  sms_version: string;

}

registryTable(Config, "Config");
