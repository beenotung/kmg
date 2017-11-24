import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import {UserSessionService} from "../user-session/user-session.service";
import {DatabaseService} from "../database/database.service";
import {StorageService} from "../storage/storage.service";
import {APIResponse} from "../api";
import {APIResponseDB, BugReport} from "../../model/api/custom/bug-report";
import {isDefined} from "@beenotung/tslib/lang";

@Injectable()
export class BugReportService {

  constructor(private userSession: UserSessionService
    , private db: DatabaseService
    , private storage: StorageService) {
    console.log("Hello DebugApiProvider Provider");
  }

  /**
   * 1. store locally
   * 2. sent to db
   * 3. remove from local if step 2 success
   * */
  async storeBugReport(bugReport: BugReport) {
    const key = "debug-" + Date.now();
    let stored = false;
    let sent = false;
    bugReport.device_id = await this.userSession.getDeviceID();
    return this.storage.storage.set(key, bugReport)
      .then(_ => stored = true)
      .catch(err => console.error("failed to store bug report:", err))
      .then(_ => this.db.insert<BugReport>(BugReport, bugReport).toPromise())
      .then(res => sent = true)
      .catch(err => console.error("failed to send bug report", err))
      .then(_ => {
        if (stored && sent) {
          return this.storage.storage.remove(key);
        }
      });
  }

  async store(o: any) {
    if (o instanceof Error) {
      return this.storeError(o);
    }
    if (o && isDefined(o.result_code)) {
      return this.storeAPIResponse(o);
    }
    const bugReport = BugReport.init(await this.userSession.getDeviceID(), new Error());
    bugReport.data = o;
    return this.storeBugReport(bugReport);
  }

  async storeError(e: Error) {
    return this.storeBugReport(BugReport.init(await this.userSession.getDeviceID(), e));
  }

  async storeAPIResponse(res: APIResponse<any, any>) {
    return this.storeBugReport(BugReport.init(
      await this.userSession.getDeviceID()
      , new Error()
      , {
        error_code: (res.result_enum as { [code: number]: string })[res.result_code]
        , reason: res.reason
        , data: res.data
      } as APIResponseDB));
  }
}
