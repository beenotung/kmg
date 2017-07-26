import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import {UserSession} from "../user-session/user-session";
import {DatabaseService} from "../database-service/database-service";
import {StorageService} from "../storage-service/storage-service";
import {APIResponse} from "../api";
import {BugReport} from "../../model/api/bug-report";
import {isDefined} from "@beenotung/tslib/src/lang";

/*
  Generated class for the DebugApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BugReportAPI {

  constructor(public http: Http
    , private userSession: UserSession
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
    bugReport.creator_id = this.userSession.tryGetUserID() || "";
    bugReport.role = this.userSession.current_user_role || "";
    return this.storage.storage.set(key, bugReport)
      .then(_ => stored = true)
      .catch(err => console.error("failed to store bug report:", err))
      .then(_ => this.db.getTable(BugReport))
      .then(table => table.insert(bugReport).toPromise())
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
    const bugReport = new BugReport();
    bugReport.data = o;
    bugReport.error = new Error();
    return this.storeBugReport(bugReport);
  }

  async storeError(e: Error) {
    const bugReport = new BugReport();
    bugReport.error = e;
    return this.storeBugReport(bugReport);
  }

  async storeAPIResponse(res: APIResponse<any, any>) {
    const bugReport = new BugReport();
    bugReport.api_response = {
      error_code: res.result_enum[res.result_code]
      , reason: res.reason
      , data: res.data
    };
    bugReport.error = new Error();
    return this.storeBugReport(bugReport);
  }
}
