import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {Storage} from "@ionic/storage";
import {BrowserXhr, Http, HttpModule} from "@angular/http";

import {MyApp} from "./app.component";
import {CommonService} from "../providers/common-service/common-service";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {LoginPage} from "../pages/login/login";
import {TabsPage} from "../pages/tabs/tabs";
import {TabHeaderComponent} from "../components/tab-header/tab-header";
import {MenuSelectorButtonComponent} from "../components/menu-selector-button/menu-selector-button";
import {SearchSelectListPage} from "../pages/search-select-list/search-select-list";
import {SettingPage} from "../pages/setting/setting";
import {UserSession} from "../providers/user-session/user-session";
import {BugReportAPI} from "../providers/debug-report-service/bug-report-service";
import {LoadingDivComponent} from "../components/loading-div/loading-div";
import {ShortIdPipe} from "../pipes/short-id/short-id";
import {NoticeService} from "../providers/notice-service/notice-service";
import {WelcomePage} from "../pages/welcome/welcome";
import {DatabaseService} from "../providers/database-service/database-service";
import {StorageService} from "../providers/storage-service/storage-service";
import {HLineModule} from "ioniclib";
import {HorizonModule, LoadingModule, ProgressBrowserXhr, ProgressModule} from "angularlib";
import {UniqueDeviceID} from "@ionic-native/unique-device-id";

export function provideStorage() {
  return new Storage({
    driverOrder: ["sqlite", "indexeddb", "websql", "localstorage"]
  });
}

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    /* lib components */

    /* main */
    MyApp,

    /* sign up and login pages */
    LoginPage,
    WelcomePage,

    /* utils pages */
    TabsPage,
    SearchSelectListPage,
    SettingPage,

    /* main tabs */

    /* components */
    TabHeaderComponent,
    MenuSelectorButtonComponent,
    LoadingDivComponent,

    /* pipes */
    ShortIdPipe,

  ],
  imports: [
    BrowserModule
    , IonicModule.forRoot(MyApp)
    , HttpModule
    , TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http],
      }
    })
    , HLineModule
    , LoadingModule
    , HorizonModule
    , ProgressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    /* sign up and login pages */
    LoginPage,
    WelcomePage,

    /* utils pages */
    TabsPage,
    SearchSelectListPage,
    SettingPage,

    /* main four tabs */

    /* other components */
    LoadingDivComponent,
  ],
  providers: [
    /* lib services */
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: BrowserXhr, useClass: ProgressBrowserXhr},
    {provide: Storage, useFactory: provideStorage},
    // Geolocation,
    UniqueDeviceID,
    /* custom services */
    DatabaseService,
    StorageService,
    CommonService,
    UserSession,
    BugReportAPI,
    NoticeService,
  ]
})

export class AppModule {
}
