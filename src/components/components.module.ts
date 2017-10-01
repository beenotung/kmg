import {NgModule} from "@angular/core";
import {TabHeaderComponent} from "./tab-header/tab-header";
import {MenuSelectorButtonComponent} from "./menu-selector-button/menu-selector-button";
import {LoadingDivComponent} from "./loading-div/loading-div";
import {IonicModule} from "ionic-angular";
import {LineModule} from "ioniclib";
import {HorizonModule, LoadingModule, ProgressModule} from "angularlib";

@NgModule({
  declarations: [
    TabHeaderComponent
    , MenuSelectorButtonComponent
    , LoadingDivComponent
  ],
  imports: [
    IonicModule
    , LineModule
    , LoadingModule
    , HorizonModule
    , ProgressModule
  ],
  exports: [
    TabHeaderComponent
    , MenuSelectorButtonComponent
    , LoadingDivComponent
  ]
})
export class ComponentsModule {
}
