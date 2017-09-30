import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import {Toast, ToastController, ToastOptions} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";
import {config} from "../../app/app.config";
import {StorageKey, StorageService} from "../storage";
import {enum_only_string} from "@beenotung/tslib/enum";
import {takeAll} from "@beenotung/tslib/array";

/**
 * remote events
 * trigger by other user
 * */
export enum RemoteNotice {
}

enum_only_string(RemoteNotice);

/**
 * local events
 * trigger by local system, e.g. UI hint
 * */
export enum LocalNotice {
  client_update, success
}

enum_only_string(LocalNotice);

function getToastDuration(type: RemoteNotice | LocalNotice): number {
  return RemoteNotice[type]
    ? config.Toast_Duration_Normal
    : config.Toast_Duration_Short;
}

function genToastOptions(type: RemoteNotice | LocalNotice, message: string): ToastOptions {
  return {
    message
    , duration: getToastDuration(type)
    , position: RemoteNotice[type] ? "top" : "bottom"
    , showCloseButton: true
    , dismissOnPageChange: true
  };
}

const lastTime: { [type: string]: number } = {};

function toKey(type: RemoteNotice | LocalNotice, id: string): StorageKey {
  return (type + "-" + id) as any;
}

const toast_list: Toast[] = [];

/**
 * only manage local, in-app notifications
 *
 * remote notifications should be triggered externally from another program
 *
 * TODO store sent message to DB to avoid duplicated message of in-app and SMS notification
 * */
@Injectable()
export class NoticeService {

  constructor(private translate: TranslateService
    , private toastCtrl: ToastController
    , private storage: StorageService) {
    console.log("Hello NoticeService Provider");
  }

  async showNotice(type: RemoteNotice | LocalNotice, msg: string, id?: string, needTranslate = true) {
    if (id && !await this.isShouldShow(type, id)) {
      return;
    }
    if (needTranslate) {
      msg = await this.translate.get(msg).toPromise();
    }
    const toast = this.toastCtrl.create(genToastOptions(type, msg));
    lastTime[type] = Date.now();
    await Promise.all(takeAll(toast_list).map(x => x.dismiss()));
    toast_list.push(toast);
    await toast.present();
    await this.storage.set(toKey(type, id), true);
  }

  async isShouldShow(type: RemoteNotice | LocalNotice, id: string): Promise<boolean> {
    if (await this.storage.has(toKey(type, id))) {
      return false;
    }
    const last = lastTime[type];
    return !last || last + getToastDuration(type) <= Date.now();
  }
}
