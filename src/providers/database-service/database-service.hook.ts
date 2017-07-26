import {getSemverDiffType, SemverDiffType, to_semver} from "@beenotung/tslib/src/semver";
import {assets} from "../../app/app.res";
import {tryWithDefault} from "@beenotung/tslib/src/lang";
import {AppType, getAppType} from "@beenotung/tslib/src/ionic";
import {swal, SweetAlertOptions} from "@beenotung/tslib/src/typestub-sweetalert2";
import {data} from "../../app/app.data";
import {config} from "../../app/app.config";
import {HintType, NoticeService} from "../notice-service/notice-service";
import {databaseService, DatabaseService} from "./database-service";
import {Config} from "../../model/api/config";

export function hookCheckClientVersion(noticeService: NoticeService) {
  databaseService.hooks.checkClientVersion = async (db: DatabaseService, remote_config: Config) => {
    console.log({local_version: config.client_version, remote_version: remote_config.client_version});
    if (!remote_config.db_version) {
      remote_config.client_version = config.client_version;
      return (await db.getTable(Config)).store(remote_config).toPromise();
    }
    if (remote_config.client_version == config.client_version) {
      console.log("client is latest version");
      return "same version";
    }
    const res = tryWithDefault<SemverDiffType>(() =>
        getSemverDiffType(to_semver(remote_config.client_version), to_semver(config.client_version))
      , SemverDiffType.newer);
    switch (res) {
      case SemverDiffType.same:
        return;
      case SemverDiffType.newer:
        /* client is new, update remote */
        console.log("client is updated to new version");
        const newConfig: Config = <any>{};
        newConfig.id = remote_config.id;
        newConfig.edit_time = Date.now();
        newConfig.client_version = config.client_version;
        return db.getTable(Config).then(table => table.update(newConfig).toPromise());
      case SemverDiffType.compatible:
        /* there is a backward compatible update */
        return noticeService.showLocalNotice(
          HintType.client_update, assets.i18n.update_optional);
      case SemverDiffType.breaking:
        /* there is a breaking update */
        console.log("client is outdated");
        const title = "msg_.error_.update_client_title";
        const type = tryWithDefault(() => getAppType(db.platform), "others");
        const msg = "msg_.error_.update_client_" + type;
        db.translate.get([title, msg]).toPromise()
          .then(o => swal(<SweetAlertOptions>{
            type: "info"
            , title: o[title]
            , text: o[msg]
            , showConfirmButton: true
          }))
          .then(res => {
            /**
             * tmp disable itune and ms store link
             * */
            if (eval("true")) {
              if (getAppType(db.platform) === AppType.android) {
                location.href = data.google_play;
              } else {
                location.search = "";
              }
              return;
            }
            switch (getAppType(db.platform)) {
              case AppType.web:
                location.search = "";
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
                console.warn("unknown platform:", type);
            }
          });
        db.clearCache();
      // throw new Error('out dated client');
    }
  };
}
