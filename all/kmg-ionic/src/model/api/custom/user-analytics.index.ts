import {registryIndex} from "../tables";
import {BaseSearchObject} from "../base/base-search-object";
import {UserAnalytics} from "./user-analytics";

export class SearchByDeviceID extends BaseSearchObject {
  constructor(public device_id: string) {
    super();
  }
}

registryIndex(UserAnalytics, SearchByDeviceID);
