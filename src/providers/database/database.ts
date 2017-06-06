import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {autoRetryAsync, createDefer, Defer} from "../../../lib/tslib/src/async";
import {config} from "../../app/app.config";
import {CustomBrowserXhr} from "../../../lib/tslib/src/angular";
import {getHorizon, horizon_api_size, load_horizon_ng} from "../../../lib/tslib/src/horizon";
import {StorageKey, StorageProvider} from "../storage/storage";
import {clear} from "../../../lib/tslib/src/array";
import {Horizon, OldRecord, TableObject} from "../../../lib/typestub-horizon-client/index";


export class DBCache {
  hz: Horizon;
}

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DatabaseProvider {

  // private storage: LargeLocalStorage;//=new LargeLocalStorage({size:this.storageSize,name:'cacheDb'});

  constructor(private http: Http
    , private storage: StorageProvider) {
    config.initialize().then(() => {
      if (DatabaseProvider.dbCache.hz) {
        console.log('skip db init');
      } else {
        this.initialize();
      }
    });
  }

  initialize() {
    console.log('bootstrapping horizon...');
    (async () => {
      let sub = CustomBrowserXhr.progressEventEmitter.subscribe((event: any) => {
        console.log(event.loaded, event.loaded / horizon_api_size * 100 + '%');
      });
      let url = (await config.initialize()).serverUrlBase() + 'horizon/horizon.js';
      let preF = () => console.log('loading horizon...');
      await autoRetryAsync(() => load_horizon_ng(this.http, url, preF), config.network_retry_interval);
      sub.unsubscribe();

      console.log('connecting to horizon...');
      // let hz = Horizon({host: config.serverIp});
      DatabaseProvider.dbCache.hz = getHorizon()();
      DatabaseProvider.dbCache.hz.onReady(() => {
        console.log('horizon is ready');
        onConnected().then(() =>
          clear(DatabaseProvider.pendings).forEach(d => d.resolve(DatabaseProvider.dbCache.hz))
        );
      });
      DatabaseProvider.dbCache.hz.onSocketError(err => {
        console.log('horizon socket error', err)
      });
      DatabaseProvider.dbCache.hz.connect();
    })();


    let initTables = async () => {
      return Promise.all([]);
    };

    let onConnected = async () => {
      await initTables();
      return 'ok';
    };
  }


  logout() {
    return this.storage.remove(StorageKey.UserId);
  }

  getHz(): Promise<Horizon> {
    let defer = createDefer();
    if (DatabaseProvider.dbCache.hz) {
      defer.resolve(DatabaseProvider.dbCache.hz);
    }
    else {
      DatabaseProvider.pendings.push(defer);
    }
    return defer.promise;
  }

  getTable<A>(name: string): Promise<TableObject<A>> {
    return this.getHz().then(hz => hz(name));
  }

  clearCache() {
    DatabaseProvider.dbCache = new DBCache();
  }

}

type Table<A> = {
  initTable: (db: DatabaseProvider) => Promise<any>
  getTable: (db: DatabaseProvider) => Promise<TableObject<A>>
}
export const Tables: Table<OldRecord>[] = [];


export namespace DatabaseProvider {
  export const pendings: Defer<Horizon, any>[] = [];
  export let progress: number;
  export let dbCache = new DBCache();
}
