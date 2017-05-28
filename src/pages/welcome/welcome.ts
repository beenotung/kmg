import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";
import {CommonProvider} from "../../providers/common/common";
import "rxjs/add/operator/toPromise";
import {DatabaseProvider} from "../../providers/database/database";

/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  text = 'loading';

  status = 'loading';

  constructor(public navCtrl: NavController
    , private translate: TranslateService
    , private comm: CommonProvider
    , private db: DatabaseProvider
    , public navParams: NavParams) {
    translate.get('test').toPromise().then(s => this.text = s);
    db.getHz().then(() => this.status = 'Ready');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
