import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import {Role} from '../../model/data/role';
import {UserSession} from '../../providers/user-session/user-session';
import {SettingPage} from '../setting/setting';

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  role: Role;
  Role = Role;

  tab1 = SettingPage;
  tab2 = SettingPage;
  tab3 = SettingPage;
  tab4 = SettingPage;

  constructor(public navCtrl: NavController
    , public translate: TranslateService
    , private userSession: UserSession) {

    this.role = this.userSession.current_user_role;
  }

}
