import {Component, forwardRef, Inject, OnInit} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";
import "rxjs/add/operator/toPromise";
import {CommonService} from "../../services/common/common.service";
import {DatabaseService} from "../../services/database/database.service";
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: "page-welcome",
  templateUrl: "welcome.html",
})
export class WelcomePage implements OnInit {

  text = "loading";

  status = "loading";

  constructor(public navCtrl: NavController
    , translate: TranslateService
    , @Inject(forwardRef(() => CommonService)) private common: CommonService
              // , private common: CommonService
    , db: DatabaseService
    , public navParams: NavParams) {
    translate.get("test").toPromise().then(s => this.text = s);
    db.getHz().then(() => this.status = "Ready");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad WelcomePage");
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.common.showLoading();
      setTimeout(() => {
        this.common.dismissLoading();
        this.navCtrl.setRoot(TabsPage);
      }, 2000);
    }
  }

}
