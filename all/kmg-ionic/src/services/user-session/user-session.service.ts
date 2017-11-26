import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/observable/fromPromise";
import {createDefer, Defer} from "@beenotung/tslib/async";
import {isDefined} from "@beenotung/tslib/lang";

@Injectable()
export class UserSessionService {

  public readonly sessionID = Date.now().toString();
  private userIDDefer: Defer<string, any> = createDefer<string, any>();
  private userID?: string;

  constructor() {
    console.log("Hello UserSessionServiceProvider Provider");
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
}
