import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {config} from "../../app/app.config";
import {StorageKey, StorageService} from "../../services/storage/storage.service";

export type Lang = "en" | "zh";

@Component({
  selector: "page-settings",
  templateUrl: "settings.html",
})
export class SettingsPage {

  pushNotice: boolean = false;
  lang: Lang;
  mode = config.mode;

  constructor(public navCtrl: NavController
    , private storage: StorageService
    , public navParams: NavParams) {
    this.storage.get<Lang>(StorageKey.lang).then(x => this.lang = x);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SettingsPage");
  }

  changeLang() {
    this.storage.set(StorageKey.lang, this.lang);
  }

}
