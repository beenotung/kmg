import {BaseDBObject} from "../../model/api/base-db-object";
import {Type} from "@beenotung/tslib/src/lang";
import {Horizon, TableObject} from "typestub-horizon-client";

const tables = new Map<Type<BaseDBObject>, string>();

export function toTable<A extends BaseDBObject>(hz: Horizon, type: Type<A>): TableObject<A> {
  const name = tables.get(type);
  if (typeof name !== "string") {
    console.error("table", type, "is not registered");
    throw new TypeError("table not registered");
  }
  return hz(name);
}

export function registryTable(type: Type<BaseDBObject>, name: string) {
  tables.set(type, name);
}
