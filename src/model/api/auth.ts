import {BaseDBObject} from './base-db-object';
import {RoleType} from '../data/role';
import {registryTable} from '../../providers/database/tables';

export class Auth extends BaseDBObject {
  user_id: string;
  user_role: RoleType;
  auth_id: string;
  auth_type: string;
}

registryTable(Auth, 'Auth');

export enum AuthType {
  phone
}
