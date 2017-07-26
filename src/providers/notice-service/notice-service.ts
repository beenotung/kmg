import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import {Toast, ToastController, ToastOptions} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";
import {config} from "../../app/app.config";
import {StorageKey, StorageService} from "../storage-service/storage-service";
import {SMSType} from "../../model/api/sms-notice";

/* only for in-app notification */
export enum HintType {
  client_update
}

function genToastOptions(message: string, position: "top" | "bottom"): ToastOptions {
  return {
    message: message
    , duration: position === "top" ? config.Toast_Duration_Normal : config.Toast_Duration_Short
    , position: position
    , showCloseButton: true
    , dismissOnPageChange: true
  };
}

interface RemoteMessage {
  msg: string;
  needTranslate: boolean;
}

const lastRemoteTime: { [smsType: string]: number } = {};
const lastLocalTime: { [hintType: string]: number } = {};

/**
 * only manage local, in-app notifications
 *
 * remote notifications should be triggered externally from another program
 *
 * TODO store sent message to DB to avoid duplicated message of in-app and SMS notification
 * */
@Injectable()
export class NoticeService {
  private local_toast_list: Toast[] = [];
  private remote_toast_list: Toast[] = [];

  constructor(public http: Http
    , private translate: TranslateService
    , private toastCtrl: ToastController
    , private storage: StorageService) {
    console.log("Hello NoticeService Provider");
  }

  /**
   * notice trigger by external party, e.g. other user
   * */
  async showRemoteNotice(type: SMSType, id: string, msg: string, needTranslate = true) {
    if (!await this.isShouldShowRemote(type, id)) {
      return;
    }
    const p1 = this.storage.append<RemoteMessage>(StorageKey.notices, {msg: msg, needTranslate: needTranslate});
    if (needTranslate) {
      msg = await this.translate.get(msg).toPromise();
    }
    const toast = this.toastCtrl.create(genToastOptions(msg, "top"));
    try {
      await Promise.all(this.remote_toast_list.map(x => x.dismiss()));
    } catch (e) {
      console.error(e);
    }
    this.remote_toast_list = [toast];
    const p2 = toast.present();
    return Promise.all([p1, p2]);
  }

  /**
   * notice trigger by the local system, e.g. UI hints
   * */
  async showLocalNotice(type: HintType, msg: string, needTranslate = true) {
    if (!this.isShouldShowLocal(type)) {
      return;
    }
    if (needTranslate) {
      msg = await this.translate.get(msg).toPromise();
    }
    const toast = this.toastCtrl.create(genToastOptions(msg, "bottom"));
    try {
      await Promise.all(this.local_toast_list.map(x => x.dismiss()));
    } catch (e) {
      console.error(e);
    }
    this.local_toast_list = [toast];
    return toast.present();
  }

  /**
   * return false if it already exist
   * otherwise, store it and return true
   * */
  async isShouldShowRemote(type: SMSType, id: string) {
    const key: StorageKey = <any> (type + "-" + id);
    const res = await this.storage.get(key);
    if (res) {
      return false;
    } else {
      await this.storage.set(key, true);
      const last = lastRemoteTime[type];
      const now = Date.now();
      if (!last || last + config.Toast_Duration_Normal <= now) {
        lastRemoteTime[type] = now;
        return true;
      } else {
        return false;
      }
    }
  }

  async isShouldShowLocal(type: HintType) {
    const last = lastLocalTime[type];
    const now = Date.now();
    if (!last || last + config.Toast_Duration_Long <= now) {
      lastLocalTime[type] = now;
      return true;
    }
    return false;
  }
}
