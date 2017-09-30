import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/observable/fromPromise";
import {CommonResult} from "../api";
import {StorageKey, StorageService} from "../storage";
import {DatabaseService} from "../database";
import {createDefer, Defer} from "@beenotung/tslib/async";
import {UserAnalytics} from "../../model/api/custom/user-analytics";
import {isDefined} from "@beenotung/tslib/lang";
import {UniqueDeviceID} from "@ionic-native/unique-device-id";
import {is_non_empty_string} from "@beenotung/tslib/string";
import {SearchByDeviceID} from "../../model/api/custom/user-analytics.index";

export function isRealDeviceID(s: string) {
  return !s.startsWith("db_");
}

/*
  Generated class for the UserSessionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserSessionService {

  public readonly sessionID = Date.now().toString();
  private userIDDefer: Defer<string, any> = createDefer<string, any>();
  private userID?: string;

  constructor(private storage: StorageService
    , private uniqueDeviceID: UniqueDeviceID
    , private db: DatabaseService) {
    console.log("Hello UserSessionProvider Provider");

    (async () => {
      const deviceID = await this.getDeviceID();
      const res = await this.db.query<UserAnalytics, SearchByDeviceID>(UserAnalytics, new SearchByDeviceID(deviceID)).mergeMap(q => q
        .find().fetch().defaultIfEmpty()).toPromise();
      if (res && res.user_id && res.user_id !== "") {
        this.userIDDefer.resolve(res.user_id);
        this.userID = res.user_id;
      } else {
        console.debug("new user");
      }
    })();

  }

  async getDeviceID(): Promise<string> {
    let deviceID: string | undefined = await this.getNativeDeviceID();
    if (is_non_empty_string(deviceID)) {
      return deviceID;
    }
    deviceID = await this.storage.get<string>(StorageKey.device_id);
    if (is_non_empty_string(deviceID)) {
      return deviceID;
    }
    return this.registerDeviceID();
  }

  async getUserID() {
    return this.userIDDefer.promise;
  }

  tryGetUserID(): string | "" {
    return this.userID || "";
  }

  setUserID(userID: string) {
    this.userID = userID;
    this.userIDDefer.resolve(userID);
    this.userIDDefer.promise.then(x => {
      if (x !== userID) {
        this.userIDDefer = createDefer<string, any>();
        this.userIDDefer.resolve(userID);
      }
    });
  }

  logout() {
    this.userID = undefined;
    this.userIDDefer = createDefer<string, any>();
  }

  hasLogin() {
    return isDefined(this.userID) && this.userID !== "";
  }

  async checkAuth(): Promise<CommonResult> {
    if (!this.userID) {
      return CommonResult.not_login;
    }
    /* TODO [later] check if banned from db */
    return CommonResult.ok;
  }

  private async getNativeDeviceID(): Promise<string | undefined> {
    try {
      const res = await this.uniqueDeviceID.get();
      console.log("device_id=" + res);
      return res;
    } catch (e) {
      /* not supported, e.g. in web browser */
      console.warn(e);
      const s = await this.storage.get<string>(StorageKey.device_id);
      return is_non_empty_string(s) ? s : undefined;
    }
  }

  /**
   * only for non native mobile users
   * */
  private async registerDeviceID(): Promise<string> {
    const record = UserAnalytics.init("");
    const res = await this.db.store(UserAnalytics, record).toPromise();
    const device_id = "db_" + res.id;
    const update: UserAnalytics = {} as any;
    update.id = res.id;
    update.device_id = device_id;
    const p1 = this.db.update(UserAnalytics, update).toPromise();
    const p2 = this.storage.set(StorageKey.device_id, device_id);
    await Promise.all([p1, p2]);
    return device_id;
  }

}
