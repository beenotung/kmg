import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {UserSessionService} from "../services/user-session/user-session.service";
import {StorageService} from "../services/storage/storage.service";
import {Storage} from "@ionic/storage"
import {GamePage} from "../pages/game/game";
import {GameComponent} from "../components/game/game.component";
import {SettingsPage} from "../pages/settings/settings";
import {LoginPage} from "../pages/login/login";
import {HLineComponent, LineModule} from "ioniclib";
import {ComponentsModule} from "../components/components.module";
import {LineMode} from "ioniclib/components";

export function provideStorage() {
  return new Storage({
    driverOrder: ["sqlite", "indexeddb", "websql", "localstorage"]
  });
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    GamePage,
    SettingsPage,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LineModule,
    ComponentsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    LoginPage,
    HomePage,
    TabsPage,
    SettingsPage,
    GamePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Storage, useFactory: provideStorage},
    UserSessionService,
    StorageService,
  ]
})
export class AppModule {
}
