import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/map';

export enum StorageKey {
  lang
    , role
    , user_id
    , notices
}

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StorageProvider {
  constructor(public storage: Storage) {
  }

  async set(key: StorageKey, value: any) {
    return this.storage.set(StorageKey[key], value);
  }

  async get<A>(key: StorageKey): Promise<A> {
    return this.storage.get(StorageKey[key]);
  }

  async remove(key: StorageKey) {
    return this.storage.remove(StorageKey[key]);
  }

  async append<A>(key: StorageKey, x: A) {
    const xs: A[] = await this.get<A[]>(key) || <A[]>[];
    xs.push(x);
    return this.set(key, xs);
  }
}
