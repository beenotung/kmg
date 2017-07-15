import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {autoRetryAsync, createDefer} from '../../../lib/tslib/src/async';
import {config} from '../../app/app.config';
import {getHorizon, horizon_api_size, load_horizon_ng} from '../../../lib/tslib/src/horizon';
import {StorageKey, StorageProvider} from '../storage/storage';
import {Horizon, TableObject} from '../../../lib/typestub-horizon-client/index';
import {tryWithDefault, Type} from '../../../lib/tslib/src/lang';
import {ProgressService} from '../../../lib/tslib/src/angular/progress';
import {BaseDBObject} from '../../model/api/base-db-object';
import {Config} from '../../model/api/config';
import {swal} from '../../lib';
import {TranslateService} from '@ngx-translate/core';
import {is_compatible, is_newer, to_semver} from '../../../lib/tslib/src/semver';
import {toTable} from './tables';
import {Platform} from 'ionic-angular';
import {AppType, getAppType} from '../../../lib/tslib/src/ionic';
import {SweetAlertOptions} from '../../../lib/tslib/src/typestub-sweetalert2';
import {data} from '../../app/app.data';
import {NoticeService} from '../notice-service/notice-service';
import {assets} from '../../app/app.res';


export class DBCache {
  hz: Horizon;
  hzDefer = createDefer<Horizon, any>();
}

export interface CustomHorizon {
  <A extends BaseDBObject>(type: Type<A>): TableObject<A>;
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
    , private httpProgress: ProgressService
    , private translate: TranslateService
    , private platform: Platform
    , private noticeService: NoticeService
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

    const initTables = async () => {
      return Promise.all([]);
    };

    const onConnected = async () => {
      await initTables();
      return 'ok';
    };

    (async () => {
      const sub = this.httpProgress.downloadProgress.subscribe((event: any) => {
        console.log(event.loaded, event.loaded / horizon_api_size * 100 + '%');
      });
      const url = (await config.initialize()).serverUrlBase() + 'horizon/horizon.js';
      const preF = () => console.log('loading horizon...');
      await autoRetryAsync(() => load_horizon_ng(this.http, this.httpProgress, url, preF), config.network_retry_interval);
      sub.unsubscribe();

      console.log('connecting to horizon...');
      // let hz = Horizon({host: config.serverIp});
      DatabaseProvider.dbCache.hz = getHorizon()();
      DatabaseProvider.dbCache.hz.onReady(() => {
        console.log('horizon is ready');
        onConnected()
          .then(() => DatabaseProvider.dbCache.hzDefer.resolve(DatabaseProvider.dbCache.hz))
          .then(_ => this.checkClientVersion());
      });
      DatabaseProvider.dbCache.hz.onSocketError(err => {
        console.log('horizon socket error', err);
      });
      DatabaseProvider.dbCache.hz.connect();
    })();
  }


  logout() {
    return this.storage.remove(StorageKey.user_id);
  }

  getHz(): Promise<CustomHorizon> {
    return DatabaseProvider.dbCache.hzDefer.promise
      .then(hz => type => toTable(hz, type));
  }

  getTable<A extends BaseDBObject>(type: Type<A>): Promise<TableObject<A>> {
    return this.getHz().then(hz => hz(type));
  }

  clearCache() {
    DatabaseProvider.dbCache = new DBCache();
  }

  async checkClientVersion() {
    const table = await this.getTable(Config);
    if ((await table.fetch().toPromise()).length == 0) {
      const o = new Config();
      o.client_version = config.client_version;
      await table.insert(o).toPromise();
    }
    return table
      .watch()
      .flatMap(xs => xs)
      .subscribe(remote => {
        console.log({local_version: config.client_version, remote_version: remote.client_version});
        if (remote.client_version == config.client_version) {
          console.log('client is latest version');
          return 'same version';
        }
        const remote_version = to_semver(remote.client_version);
        const local_version = to_semver(config.client_version);
        if (is_newer(remote_version, local_version)) {
          /* client is new, update remote */
          console.log('client is updated to new version');
          const newConfig: Config = <any>{};
          newConfig.id = remote.id;
          newConfig.edit_time = Date.now();
          newConfig.client_version = config.client_version;
          this.getTable(Config).then(table => table.update(newConfig).toPromise());
        } else {
          /* client is old, check to stop the user */
          if (is_compatible(local_version, remote_version)) {
            /* there is a backward compatible update */
            return this.noticeService.showLocalNotice(assets.i18n.update_optional);
          }
          /* there is a breaking update */
          console.log('client is outdated');
          const title = 'msg_.error_.update_client_title';
          const type = tryWithDefault(() => getAppType(this.platform), 'others');
          const msg = 'msg_.error_.update_client_' + type;
          this.translate.get([title, msg]).toPromise()
            .then(o => swal(<SweetAlertOptions>{
              type: 'info'
              , title: o[title]
              , text: o[msg]
              , showConfirmButton: true
            }))
            .then(res => {
              switch (getAppType(this.platform)) {
                case AppType.web:
                  location.search = '';
                  break;
                case AppType.android:
                  location.href = data.google_play;
                  break;
                case AppType.ios:
                  location.href = data.itune;
                  break;
                case AppType.windows:
                  location.href = data.microsoft_store;
                  break;
                default:
              }
            });
          DatabaseProvider.dbCache = new DBCache();
          // throw new Error('out dated client');
        }
      });
  }
}

export namespace DatabaseProvider {
  export let progress: number;
  export let dbCache = new DBCache();
}
