import {BaseDBObject} from "../base/base-db-object";
import {registryTable} from "../tables";

export declare class Place implements BaseDBObject {
  constructor(never: never);
}

export interface Place extends BaseDBObject {
  lat: number;
  lng: number;
  /* translate key */
  code: string;
  /* user added name (use this before translate is ready) */
  name: string;
  /* e.g. City or Country for small one */
  region: string;
}

export namespace Place {
  export const tableName = "Place";

  export function init(lat: number, lng: number, name: string, region: string): Place {
    const place = <Place> BaseDBObject.init();
    place.lat = lat;
    place.lng = lng;
    place.name = name;
    place.region = region;
    return place;
  }

  export function clone(place: Place): Place {
    return Object.assign({}, place);
  }

  export function createDefault(): Place {
    const res = init(
      22.308047
      , 113.9184808
      , "Hong Kong International Airport (HKG), 1 Sky Plaza Rd, Hong Kong"
      , "hk"
    );
    res.id = "default-hk";
    return res;
  }

  export function isDefault(p: Place): boolean {
    return p.id && p.id.startsWith("default");
  }
}
registryTable(Place);
