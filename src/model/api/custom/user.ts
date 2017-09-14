import {BaseDBObject} from "../base/base-db-object";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/toPromise";
import {Place} from "./location";
import {CreatedObject} from "typestub-horizon-client";
import {UserAnalytics} from "./user-analytics";
import {SearchByDeviceID} from "./user-analytics.index";
import {createUpdateQueryChain, DatabaseService} from "../../../providers/database-service/database-service";
import {registryTable} from "../tables";

export declare class User {
  constructor(never: never) ;
}

export interface User extends BaseDBObject {

  nickname: string;

  // for known languages
  // known_lang_zh: boolean = false;
  // known_lang_en: boolean = false;
  // known_lang_es: boolean = false;
  //
  // [known_lang_x: string]: boolean;

  lastPlace?: Place;

  // post_id?: string;

}

export namespace User {
  export const tableName = "User";
  export const _known_lang = "known_lang_";

  export function init(nickname: string): User {
    const user = <User> BaseDBObject.init();
    user.nickname = nickname;
    return user;
  }

  export async function create(db: DatabaseService, deviceID: string, nickname: string = "", firstLang: string): Promise<CreatedObject> {
    const user = <User> BaseDBObject.init();
    user.nickname = nickname;
    user[User._known_lang + firstLang] = true;
    const hz = await db.getHz();
    const userRes = await hz(User).store(user).toPromise();
    const searchRes = await db.query(UserAnalytics, new SearchByDeviceID(deviceID))
      .mergeMap(q => q.find().fetch().defaultIfEmpty())
      .toPromise();
    await createUpdateQueryChain<UserAnalytics>(await db.getRawHz(), UserAnalytics, searchRes.id)
      .use(x => x.user_id = userRes.id)
      .update().toPromise();
    return userRes;
  }

  export async function updateLocation(db: DatabaseService, id: string, place: Place) {
    return createUpdateQueryChain<User>(await db.getRawHz(), User, id)
      .use(x => x.lastPlace = place)
      .update()
      .toPromise();
  }

}

registryTable(User);

