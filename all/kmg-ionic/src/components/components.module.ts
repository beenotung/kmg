import {NgModule} from "@angular/core";
import {TabHeaderComponent} from "./tab-header/tab-header";
import {MenuSelectorButtonComponent} from "./menu-selector-button/menu-selector-button";
import {IonicModule} from "ionic-angular";
import {LineModule} from "ioniclib";
import {GameComponent} from "./game/game.component";

@NgModule({
  declarations: [
    TabHeaderComponent,
    MenuSelectorButtonComponent,
    GameComponent,
  ],
  imports: [
    IonicModule
    , LineModule
  ],
  exports: [
    TabHeaderComponent,
    MenuSelectorButtonComponent,
    GameComponent,
  ]
})
export class ComponentsModule {
}
