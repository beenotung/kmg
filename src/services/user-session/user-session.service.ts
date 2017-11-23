import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/observable/fromPromise";
import {CommonResult} from "../api";
import {createDefer, Defer} from "@beenotung/tslib/async";
import {UserAnalytics} from "../../model/api/custom/user-analytics";
import {isDefined} from "@beenotung/tslib/lang";
import {UniqueDeviceID} from "@ionic-native/unique-device-id";
import {is_non_empty_string} from "@beenotung/tslib/string";
import {SearchByDeviceID} from "../../model/api/custom/user-analytics.index";
import {Observable} from "rxjs/Observable";
import {StorageKey, StorageService} from "../storage/storage.service";
import {DatabaseService} from "../database/database.service";

export function isRealDeviceID(s: string) {
  return !s.startsWith("db_");
}

@Injectable()
export class UserSessionService {

  public readonly sessionID = Date.now().toString();
  private userIDDefer: Defer<string, any> = createDefer<string, any>();
  private userID?: string;

  constructor(private storage: StorageService
    , private uniqueDeviceID: UniqueDeviceID
    , private db: DatabaseService) {
    console.log("Hello UserSessionServiceProvider Provider");

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
      /* check if the record is deleted */
      const res: boolean = await this.db.query(UserAnalytics, new SearchByDeviceID(deviceID)).mergeMap(q => q.has()).toPromise();
      if (res) {
        return deviceID;
      }
    }
    return this.registerDeviceID();
  }

  async getUserID(): Promise<string> {
    return this.userIDDefer.promise;
  }

  observeUserID() {
    return Observable.fromPromise(this.getUserID());
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
      return undefined;
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
