import {Horizon, TableObject} from '../../../lib/typestub-horizon-client/index';
import {Type} from '../../../lib/tslib/src/lang';
import {BaseDBObject} from '../../model/api/base-db-object';

const tables = new Map<Type<BaseDBObject>, string>();

export function toTable<A extends BaseDBObject>(hz: Horizon, type: Type<A>): TableObject<A> {
  const name = tables.get(type);
  return hz(name);
}

export function registryTable(type: Type<BaseDBObject>, name: string) {
  tables.set(type, name);
}
