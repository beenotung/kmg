import {BaseDBObject} from './base-db-object';
import {RoleType} from '../data/role';
import {registryTable} from '../../providers/database/tables';

export class BugReport extends BaseDBObject {
  api_response: {
    error_code: string;
    reason?: any;
    data?: any;
  };
  error: {
    name: string;
    message: string;
    stack?: string;
  };
  data: any;

  role: RoleType | '';
}

registryTable(BugReport, 'BugReport');
