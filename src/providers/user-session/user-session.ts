import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/fromPromise';
import {Role} from '../../model/data/role';
import {APIResponse, CommonResult, fail, ok} from '../api';
import {StorageKey, StorageProvider} from '../storage/storage';
import {DatabaseProvider} from '../database/database';
import {app} from '../../app/app.component';
import {exitFullscreen, setFullscreen} from '../../../lib/tslib/src/dom';

/*
  Generated class for the UserSessionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserSession {

  /* must sync with storage */
  current_user_role: Role;


  /* must sync with storage */
  private current_user_id: string;

  constructor(public http: Http
    , private storage: StorageProvider
    , private db: DatabaseProvider) {
    console.log('Hello UserSessionProvider Provider');
  }

  async checkAuth(): Promise<CommonResult> {
    if (!this.current_user_id) {
      return CommonResult.not_login;
    }
    /* TODO [later] check if banned from db */
    return CommonResult.ok;
  }

  async useCurrentUserID<E extends number, A>(f: (user_id: string) => A | Promise<A> | Promise<APIResponse<E, A>>): Promise<APIResponse<E, A>> {
    const auth = await this.checkAuth();
    if (auth !== CommonResult.ok) {
      return fail(CommonResult, auth);
    }
    try {
      const res = await f(this.current_user_id);
      if (typeof res === 'object') {
        const api_res = <APIResponse<E, A>>res;
        if (typeof api_res.result_code === 'string' || typeof api_res.result_code === 'number') {
          return api_res;
        }
      }
      const a = <A | Promise<A>> res;
      return ok(Promise.resolve(a));
    } catch (e) {
      fail(CommonResult, CommonResult.unknown, e);
    }
  }

  async getCurrentUserID() {
    this.checkAuth().then(x => {
      if (x === CommonResult.ok) {
        return this.current_user_id;
      } else {
        throw <APIResponse<CommonResult, any>>{
          result_code: x
          , result_enum: CommonResult
        };
      }
    });
  }

  startSession(user_id: string, role: Role) {
    this.current_user_id = user_id;
    this.storage.set(StorageKey.user_id, user_id);

    setFullscreen(document.body);
    return this.setRole(role);
  }

  setRole(role: Role) {
    app.setRole(role);
    this.current_user_role = role;
    return this.storage.set(StorageKey.role, Role[role]);
  }

  stopSession() {
    delete this.current_user_id;
    delete this.current_user_role;

    exitFullscreen();
    return Promise.all([
      this.storage.remove(StorageKey.user_id)
      , this.storage.remove(StorageKey.role)
    ]);
  }

  tryGetUserID(): string | void {
    return this.current_user_id;
  }

}
