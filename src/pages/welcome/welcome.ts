import {Component, forwardRef, Inject} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";
import "rxjs/add/operator/toPromise";
import {DatabaseService} from "../../providers/database-service/database-service";
import {CommonService} from "../../providers/common-service/common-service";

/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-welcome",
  templateUrl: "welcome.html",
})
export class WelcomePage {

  text = "loading";

  status = "loading";

  constructor(public navCtrl: NavController
    , private translate: TranslateService
    // , private comm: CommonService
    , @Inject(forwardRef(() => CommonService)) private common: CommonService
    , private db: DatabaseService
    , public navParams: NavParams) {
    translate.get("test").toPromise().then(s => this.text = s);
    db.getHz().then(() => this.status = "Ready");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad WelcomePage");
  }

}
