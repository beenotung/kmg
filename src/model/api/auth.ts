import {BaseDBObject} from "./base-db-object";
import {registryTable} from "../../providers/database-service/tables";
import {enum_set_string} from "@beenotung/tslib/src/enum";
import {Role} from "../data/role";

export class Auth extends BaseDBObject {
  user_id: string;
  user_role: Role;
  auth_id: string;
  auth_type: string;
}

registryTable(Auth, "Auth");

export enum AuthType {
  phone
}

enum_set_string(AuthType);
