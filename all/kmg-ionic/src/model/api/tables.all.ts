import {iteratorsToArray} from "@beenotung/tslib";
import "./custom/index";
import {tables} from "./tables";

export function allTables(): string[] {
  return iteratorsToArray([tables.values()]).map(x => x.tableName);
}
