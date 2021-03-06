import {Component, Input, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {SettingsPage} from "../../pages/settings/settings";

/**
 * Generated class for the TabHeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: "tab-header",
  templateUrl: "tab-header.html"
})
export class TabHeaderComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  skipTranslate = false;

  constructor(private nav: NavController) {

  }

  ngOnInit(): void {
    if (!this.skipTranslate) {
    }
  }

  showNavigation() {
    this.nav.push(SettingsPage, {}, {
      animate: true
      , direction: "switch"
    });
  }

}
