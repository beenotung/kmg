import {Component, NgZone} from "@angular/core";
import {NavController} from "ionic-angular";
import {TranslateService} from "ng2-translate";
import {CommonProvider} from "../../providers/common/common";
import {DatabaseProvider} from "../../providers/database/database";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  status = 'loading horizon';

  constructor(public navCtrl: NavController
    , db: DatabaseProvider
    , private ng: NgZone
    , translate: TranslateService
    , common: CommonProvider) {
    db.getHz()
      .then(x => this.updateStatus('Success: loaded horizon'))
      .catch(x => this.updateStatus('Failed to load horizon'))
  }

  updateStatus(text: string) {
    console.log('updated status', text);
    this.ng.run(() => this.status = text)
  }

}
