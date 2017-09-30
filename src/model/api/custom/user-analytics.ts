import {BaseDBObject} from "../base/base-db-object";
import {registryTable} from "../tables";
import {JSONObject} from "typestub-horizon-client";
import {isHorizonDataType} from "@beenotung/tslib/horizon";

export declare class UserAnalytics {
  constructor(never: never)
}

export interface UserAnalytics extends BaseDBObject {

  user_id?: string;

  navigator: JSONObject;
  device_id: string;

}

export namespace UserAnalytics {
  export const tableName = "UserAnalytics";

  export function init(deviceID: string): UserAnalytics {
    const userAnalytics = BaseDBObject.init() as UserAnalytics;
    userAnalytics.device_id = deviceID;
    const acc = userAnalytics.navigator = {};
    Object.keys(navigator.constructor.prototype)
      .forEach(x => {
        if (x.startsWith("requestMediaKeySystemAccess")
          || x.startsWith("send")
          || x.startsWith("get")
          || x.startsWith("register")
          || x.startsWith("unregister")) {
          return;
        }
        if (typeof navigator[x] === "function") {
          switch (x) {
            case "webkitGetUserMedia":
            case "vibrate":
              return;
          }
          try {
            acc[x] = navigator[x]();
          } catch (e) {
            console.error("failed when mapping navigator field:", x, e);
            debugger;
          }
        } else {
          if (isHorizonDataType(x)) {
            acc[x] = navigator[x];
          } else {
            console.warn("skip navigator field:", x);
          }
        }
      });
    return userAnalytics;
  }
}
registryTable(UserAnalytics);
