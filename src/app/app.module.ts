import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {Storage} from "@ionic/storage";
import {BrowserXhr, Http, HttpModule} from "@angular/http";

import {MyApp} from "./app.component";
import {DatabaseProvider} from "../providers/database/database";
import {StorageProvider} from "../providers/storage/storage";
import {CommonProvider} from "../providers/common/common";
import {CustomBrowserXhr} from "../../lib/tslib/src/angular";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {WelcomePage} from "../pages/welcome/welcome";
import {HLineComponent} from "../components/h-line/h-line";

export function provideStorage() {
  return new Storage({
    driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
  });
}

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,

    /* sign up and login pages */
    WelcomePage,

    /* utils pages */
    HLineComponent,

    /* main four tabs */

    /* other components */

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
  entryComponents: [

    /* sign up and login pages */
    WelcomePage,

    /* utils pages */

    /* main four tabs */
  ],
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
