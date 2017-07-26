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
import {BugReportAPI} from "../providers/debug-report-api/bug-report-api";
import {LoadingDivComponent} from "../components/loading-div/loading-div";
import {ShortIdPipe} from "../pipes/short-id/short-id";
import {NoticeService} from "../providers/notice-service/notice-service";
import {WelcomePage} from "../pages/welcome/welcome";
import {ProgressService} from "ioniclib/src/providers/progress-service/progress-service";
import {CustomBrowserXhr} from "ioniclib/src/providers/custom-browser-xhr/custom-browser-xhr";
import {HorizonService} from "ioniclib/src/providers/horizon-service/horizon-service";
import {DatabaseService} from "../providers/database-service/database-service";
import {StorageService} from "../providers/storage-service/storage-service";
import {HLineComponent} from "ioniclib/src/components/h-line/h-line";
import {LoadingComponent} from "ioniclib/src/components/loading/loading";

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
    MyApp,

    /* sign up and login pages */
    LoginPage,
    WelcomePage,

    /* utils pages */
    TabsPage,
    SearchSelectListPage,
    SettingPage,

    /* main four tabs */

    /* other components */
    TabHeaderComponent,
    MenuSelectorButtonComponent,
    LoadingDivComponent,
    ShortIdPipe,

    /* lib components */
    HLineComponent,
    LoadingComponent,
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
  ],
  bootstrap: [IonicApp],
  entryComponents:
    [

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
    HorizonService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: BrowserXhr, useClass: CustomBrowserXhr},
    {provide: Storage, useFactory: provideStorage},
    ProgressService,
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
