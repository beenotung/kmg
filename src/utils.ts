import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {clear} from "@beenotung/tslib/array";

export function subToList<A>(sub: Observable<A>, list: A[], replace = true): Subscription {
  /* TODO [later] change subscribe function to this (need mapping) */
  let first = replace;
  return sub.subscribe(
    x => {
      if (first) {
        clear(list);
        first = false;
      }
      list.push(x);
    }
    , err => {
      /* TODO [later][ui] use toast to display error */
      console.error(err);
    });
}
