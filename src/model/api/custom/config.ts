import {BaseDBObject} from "../base/base-db-object";
import {registryTable} from "../tables";

export declare class Config implements BaseDBObject {
}

export interface Config extends BaseDBObject {
  /* common backend */
  db_version: string;

  /* for client app */
  client_version: string;

  /* for admin panel */
  admin_version: string;

  /* for SMS hub */
  sms_version: string;
}

export namespace Config {
  export const tableName = "Config";

  export function init(): Config {
    return <Config>BaseDBObject.init();
  }
}

// registryTable(Config, "Config");
registryTable(Config);
