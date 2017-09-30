import {NgModule} from "@angular/core";
import {TabHeaderComponent} from "./tab-header/tab-header";
import {MenuSelectorButtonComponent} from "./menu-selector-button/menu-selector-button";
import {LoadingDivComponent} from "./loading-div/loading-div";

@NgModule({
  declarations: [TabHeaderComponent,
    MenuSelectorButtonComponent,
    LoadingDivComponent],
  imports: [],
  exports: [TabHeaderComponent,
    MenuSelectorButtonComponent,
    LoadingDivComponent]
})
export class ComponentsModule {
}
