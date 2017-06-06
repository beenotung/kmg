import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {StorageKey, StorageProvider} from "../storage/storage";
import {first_non_null} from "../../../lib/tslib/src/lang";
import {config} from "../../app/app.config";
import {TranslateService} from "@ngx-translate/core";

/*
  Generated class for the CommonProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommonProvider {

  constructor(translate: TranslateService
    , storage: StorageProvider) {
    let lang = first_non_null(
      translate.getBrowserCultureLang()
      , translate.getBrowserLang()
      , translate.getDefaultLang()
      , config.fallbackLang
    ).split('-')[0];
    /* use env default language */
    translate.setDefaultLang(lang);
    translate.use(lang);
    console.debug('use lang', lang);

    /* use user choice language */
    storage.get<string>(StorageKey.Lang)
      .then(lang => {
        if (lang) {
          translate.use(lang);
          console.debug('use lang', lang);
        }
      })
    ;
  }

}
