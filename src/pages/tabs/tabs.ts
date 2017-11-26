import {Component, OnInit, ViewChild} from "@angular/core";
import {Tabs} from "ionic-angular";
import {SettingsPage} from "../settings/settings";
import {GamePage} from "../game/game";

@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage implements OnInit {

  static instant: TabsPage = undefined;

  @ViewChild("tabs") tabs: Tabs;

  tab1 = SettingsPage;
  tab2 = GamePage;
  tab3 = SettingsPage;
  tab4 = SettingsPage;

  constructor() {
    TabsPage.instant = this;
  }

  async ngOnInit() {
  }
}
