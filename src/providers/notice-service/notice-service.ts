import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Toast, ToastController, ToastOptions} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import {StorageKey, StorageProvider} from '../storage/storage';

function genToastOptions(message: string, position: 'top' | 'bottom'): ToastOptions {
  return {
    message: message
    , duration: position === 'top' ? 3000 : 2500
    , position: position
    , showCloseButton: true
    , dismissOnPageChange: true
  };
}

interface RemoteMessage {
  msg: string;
  needTranslate: boolean;
}

/**
 * only manage local, in-app notifications
 *
 * remote notifications should be triggered externally from another program
 * */
@Injectable()
export class NoticeService {
  private local_toast_list: Toast[] = [];
  private remote_toast_list: Toast[] = [];

  constructor(public http: Http
    , private translate: TranslateService
    , private toastCtrl: ToastController
    , private storage: StorageProvider) {
    console.log('Hello NoticeService Provider');
  }

  /**
   * notice trigger by external party, e.g. other user
   * */
  async showRemoteNotice(msg: string, needTranslate = true) {
    const p1 = this.storage.append<RemoteMessage>(StorageKey.notices, {msg: msg, needTranslate: needTranslate});
    if (needTranslate) {
      msg = await this.translate.get(msg).toPromise();
    }
    const toast = this.toastCtrl.create(genToastOptions(msg, 'top'));
    this.remote_toast_list.forEach(x => x.dismissAll());
    this.remote_toast_list = [toast];
    const p2 = toast.present();
    return Promise.all([p1, p2]);
  }

  /**
   * notice trigger by the local system, e.g. UI hints
   * */
  async showLocalNotice(msg: string, needTranslate = true) {
    if (needTranslate) {
      msg = await this.translate.get(msg).toPromise();
    }
    const toast = this.toastCtrl.create(genToastOptions(msg, 'bottom'));
    this.local_toast_list.forEach(x => x.dismissAll());
    this.local_toast_list = [toast];
    return toast.present();
  }
}
