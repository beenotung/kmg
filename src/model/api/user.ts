import {DataType} from '../../../lib/typestub-horizon-client/index';
import {BaseDBObject} from './base-db-object';
import {registryTable} from '../../providers/database/tables';

/**
 * the account root object
 * */
export class User extends BaseDBObject {
  id: string;
  [key: string]: DataType;

  /* reserved */
  referer_id?: string;
}

registryTable(User, 'User');
