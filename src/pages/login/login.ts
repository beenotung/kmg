import {Component, forwardRef, Inject} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {is_hk_mobile_phone} from '../../../lib/tslib/src/validate';
import {TranslateService} from '@ngx-translate/core';
import {StorageKey, StorageProvider} from '../../providers/storage/storage';
import {CommonService} from '../../providers/common-service/common-service';
import {config} from '../../app/app.config';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  phone_num = '';
  version = config.client_version;

  lang: string;

  constructor(public navCtrl: NavController
    , private translate: TranslateService
    , private storage: StorageProvider
    , @Inject(forwardRef(() => CommonService)) private common: CommonService
    , public navParams: NavParams) {

    this.storage.get(StorageKey.lang).then(x => {
      if (x) {
        this.lang = x.toString();
      } else {
        this.lang = this.translate.getBrowserLang();
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signup() {
    console.log('signup');
  }

  //
  // showLang() {
  //   this.modalCtrl.create(LangPopComponent).present();
  // }

  setAppLang(lang: string) {
    this.lang = lang;
    this.translate.use(lang);
    this.storage.set(StorageKey.lang, lang);
  }

  login() {
    console.log('login');
    this.navCtrl.setRoot(TabsPage);
  }

  validate(): boolean {
    return true || is_hk_mobile_phone(this.phone_num);
  }

}
