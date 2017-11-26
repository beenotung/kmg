import {CreatedObject, FindQuery, Horizon, idOrOldRecord, OldRecord, oneOrList, TableQuery} from "typestub-horizon-client";
import {Observable} from "rxjs/Observable";
import {BaseDBObject} from "../../model/api/base/base-db-object";
import {TableType} from "../../model/api/tables";
import {BaseSearchObject} from "../../model/api/base/base-search-object";

export interface CustomTableObject<Data extends BaseDBObject, Index extends BaseSearchObject> extends TableQuery<Data> {
  find(x: string | Index): FindQuery<Data>;

  findAll(x: string | Index, ...xs: Array<string | Index>): TableQuery<Data>;

  insert(oneOrList: Data | Data[]): Observable<CreatedObject>;

  // TODO test if it should be data or index
  remove(x: idOrOldRecord<Data>): Observable<string>;

  removeAll(xs: Array<idOrOldRecord<Data>>): Observable<{ id: string }>;

  // TODO test if it should be data or index
  replace(oneOrList: oneOrList<Data & OldRecord>): Observable<Data>;

  store(oneOrList: oneOrList<Data>): Observable<{ id: string }>;

  // TODO test if it should be data or index
  update(oneOrList: oneOrList<Data & OldRecord>): Observable<oneOrList<Data>>;

  // TODO test if it should be data or index
  upsert(oneOrList: oneOrList<Data>): Observable<oneOrList<Data>>;
}

export type CustomHorizon = <Data extends BaseDBObject
  , Index extends BaseSearchObject>(table: TableType<Data & Index>) => CustomTableObject<Data, Index>;

export function toCustomHorizon(hz: Horizon): CustomHorizon {
  return <Data extends BaseDBObject, Index extends BaseSearchObject>(table: TableType<Data & Index>) =>
    hz(table.tableName) as CustomTableObject<Data, Index>;
}
