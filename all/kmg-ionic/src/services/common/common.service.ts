import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {NavOptions} from "ionic-angular";
import {Page} from "ionic-angular/navigation/nav-util";

export interface NavMessage {
  type: "root" | "push"
  pageOrViewCtrl: Page | string
  params?: any
  opts?: NavOptions
  done?: () => void;
}

@Injectable()
export class CommonService {
  nav: Observable<NavMessage>;
  navObserver: Observer<NavMessage>;

  constructor() {
    this.nav = Observable.create((o: Observer<NavMessage>) => {
      this.navObserver = o;
    });
  }
}
