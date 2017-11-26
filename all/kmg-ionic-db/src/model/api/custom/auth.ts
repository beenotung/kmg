import {BaseDBObject} from "../base/base-db-object";
import {registryTable} from "../tables";
import {enum_set_string} from "@beenotung/tslib/enum";
import {Role} from "../../data/role";

export declare class Auth implements BaseDBObject {
  constructor(never: never);
}

export interface Auth extends BaseDBObject {
  user_id: string;
  user_role: Role;
  auth_id: string;
  auth_type: string;
}

export namespace Auth {
  export const tableName = "Auth";
}
registryTable(Auth);

export enum AuthType {
  phone
}

enum_set_string(AuthType);
