import {BaseDBObject} from './base-db-object';
import {registryTable} from '../../providers/database/tables';

export class Config extends BaseDBObject {
  client_version: string;
}

registryTable(Config, 'Config');
