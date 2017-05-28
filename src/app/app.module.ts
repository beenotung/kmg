import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {Storage} from "@ionic/storage";
import {BrowserXhr, Http, HttpModule} from "@angular/http";
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from "ng2-translate";

import {MyApp} from "./app.component";
import {HomePage} from "../pages/home/home";
import {DatabaseProvider} from "../providers/database/database";
import {StorageProvider} from "../providers/storage/storage";
import {CommonProvider} from "../providers/common/common";
import {CustomBrowserXhr} from "../../lib/tslib/src/angular";

export const AppComponents = [
  MyApp
  , HomePage
];


function provideStorage() {
  return new Storage({
    driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
  });
}

@NgModule({
  declarations: [
    AppComponents
  ],
  imports: [
    BrowserModule
    , IonicModule.forRoot(MyApp)
    , HttpModule
    , TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, './assets/i18n', '.json'),
      deps: [Http],
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: AppComponents,
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: BrowserXhr, useClass: CustomBrowserXhr},
    {provide: Storage, useFactory: provideStorage},
    DatabaseProvider,
    StorageProvider,
    CommonProvider
  ]
})
export class AppModule {
}
