import {Horizon, OldRecord, TableObject} from "typestub-horizon-client";
import {Type} from "@beenotung/tslib/lang";
import {BaseDBObject} from "./base/base-db-object";
import {BaseSearchObject} from "./base/base-search-object";

export interface Table {
  tableName: string;
  toData?: <A>(o: A) => OldRecord & A;
}

export type TableType<A extends BaseDBObject> = Table & Type<A>;

/* protected, package-level access only */
export const tables = new Set<TableType<BaseDBObject>>();

/**@deprecated*/
export function toTable<A extends BaseDBObject>(hz: Horizon, table: TableType<A>): TableObject<A> {
  return hz(table.tableName);
}

export function registryTable<A extends BaseDBObject>(table: TableType<A>) {
  tables.add(table);
}

const indices = new Map<Type<BaseDBObject>, Set<Type<BaseSearchObject>>>();

export function registryIndex<Data extends BaseDBObject
  , Index extends BaseSearchObject>(table: Type<Data & Index>, index: Type<Index>) {
  let s = indices.get(table);
  if (!s) {
    indices.set(table, s = new Set());
  }
  s.add(index);
}
