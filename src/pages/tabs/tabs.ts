import {Component, OnInit, ViewChild} from "@angular/core";
import {NavController, Tabs} from "ionic-angular";
import {UserSession} from "../../providers/user-session/user-session";
import {SettingPage} from "../setting/setting";
import {WelcomePage} from "../welcome/welcome";

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage implements OnInit {

  static instant: TabsPage;

  @ViewChild("tabs") tabs: Tabs;

  tab1 = SettingPage;
  tab2 = SettingPage;
  tab3 = SettingPage;
  tab4 = SettingPage;

  constructor(public navCtrl: NavController
    , private userSession: UserSession) {
    TabsPage.instant = this;
  }

  async ngOnInit() {
    if (!this.userSession.hasLogin()) {
      return this.navCtrl.setRoot(WelcomePage);
    }
  }
}
