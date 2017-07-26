import {Injectable} from "@angular/core";
import {BaseDBObject} from "../../model/api/base-db-object";
import {TranslateService} from "@ngx-translate/core";
import {toTable} from "./tables";
import {Platform} from "ionic-angular";
import {autoRetryAsync, createDefer} from "@beenotung/tslib/src/async";
import {tryWithDefault, Type} from "@beenotung/tslib/src/lang";
import {getHorizon, horizon_api_size} from "@beenotung/tslib/src/horizon";
import {Horizon, TableObject} from "typestub-horizon-client";
import {Config} from "../../model/api/config";
import {getSemverDiffType, SemverDiffType, to_semver} from "@beenotung/tslib/src/semver";
import {ProgressService} from "ioniclib/src/providers/progress-service/progress-service";
import {HorizonService} from "ioniclib/src/providers/horizon-service/horizon-service";
import {DBConfig} from "./database-service.config";

export module databaseService.hooks {
  export let checkClientVersion: (db: DatabaseService, config: Config) => Promise<any>;
  export let logout: Function;
}

export class DBCache {
  hz: Horizon;
  hzDefer = createDefer<Horizon, any>();
}

let dbCache = new DBCache();

export type CustomHorizon = <A extends BaseDBObject>(type: Type<A>) => TableObject<A>;

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DatabaseService {

  // private storage: LargeLocalStorage;//=new LargeLocalStorage({size:this.storageSize,name:'cacheDb'});

  constructor(private httpProgress: ProgressService
    , private horizonService: HorizonService
    , public translate: TranslateService
    , public platform: Platform) {

    if (dbCache.hz) {
      console.log("skip db init");
    } else {
      this.initialize();
    }
  }

  initialize() {
    console.log("bootstrapping horizon...");

    const initTables = async () => {
      return Promise.all([]);
    };

    const onConnected = async () => {
      await initTables();
      return "ok";
    };

    (async () => {
      const sub = this.httpProgress.downloadProgress.subscribe((event: any) => {
        console.log(event.loaded, event.loaded / horizon_api_size * 100 + "%");
      });
      const url = (await DBConfig.initialize()).serverUrlBase() + "horizon/horizon.js";
      const preF = () => console.log("loading horizon...");
      await autoRetryAsync(() => this.horizonService.load_horizon(url, preF), DBConfig.network_retry_interval);
      sub.unsubscribe();

      console.log("connecting to horizon...");
      // let hz = Horizon({host: config.serverIp});
      dbCache.hz = getHorizon()();
      dbCache.hz.onReady(() => {
        console.log("horizon is ready");
        onConnected()
          .then(_ => dbCache.hzDefer.resolve(dbCache.hz))
          .then(_ => this.checkDBVersion())
          .then((xs: [SemverDiffType, Config]) => databaseService.hooks.checkClientVersion(this, xs[1]))
        ;
      });
      dbCache.hz.onSocketError(err => {
        console.log("horizon socket error", err);
      });
      dbCache.hz.connect();
    })();
  }

  logout() {
    databaseService.hooks.logout();
  }

  getHz(): Promise<CustomHorizon> {
    return dbCache.hzDefer.promise
      .then(hz => type => toTable(hz, type));
  }

  getTable<A extends BaseDBObject>(type: Type<A>): Promise<TableObject<A>> {
    return this.getHz().then(hz => hz(type));
  }

  clearCache() {
    dbCache = new DBCache();
  }

  /**
   * return [db_semver_diff, Config]
   * */
  async checkDBVersion(): Promise<[SemverDiffType, Config]> {
    const table = await this.getTable(Config);
    const configs = await table.order(BaseDBObject._create_time, "descending").fetch().toPromise();
    if (configs.length === 0) {
      const o = new Config();
      o.db_version = DBConfig.db_version;
      o.id = "singleton";
      await table.store(o).toPromise();
      return [SemverDiffType.newer, void 0];
    }
    const remote_config = configs[0];
    if (DBConfig.db_version === remote_config.db_version) {
      return [SemverDiffType.same, remote_config];
    }

    const res = tryWithDefault<SemverDiffType>(
      () => getSemverDiffType(to_semver(remote_config.db_version), to_semver(DBConfig.db_version))
      , SemverDiffType.newer);
    switch (res) {
      case SemverDiffType.same:
        break;
      case SemverDiffType.newer:
        const config = new Config();
        config.id = "singleton";
        config.db_version = DBConfig.db_version;
        await table.store(config).toPromise();
        break;
      case SemverDiffType.compatible:
        console.log("db has updated, recommend to update");
        break;
      case SemverDiffType.breaking:
        dbCache = new DBCache();
        console.log("db has updated, required to update");
        break;
    }
    return [res, remote_config];
  }

}
