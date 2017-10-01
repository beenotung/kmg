import {NavOptions} from "ionic-angular";
import {createAsyncLazy} from "@beenotung/tslib/lazy";
import {is_compatible, to_semver} from "@beenotung/tslib/semver";
import {setProp, swal} from "@beenotung/tslib";
import {LoadingComponent} from "angularlib";
import {assets} from "./app.res";

export namespace config {
  export const client_version = "0.3.2";
  export const fallbackLang = "en";
  export let typing_speed = 1000 / 30;
  export let network_retry_interval = 8000;
  export const max_retry_count = 3;

  export const Toast_Duration_Short = 2000;
  export const Toast_Duration_Normal = 4000;
  export const Toast_Duration_Long = 8000;

  export const mode: "dev" | "test" | "prod" = "dev";

  /**@remark must be called before loading horizon */
  export const initialize = createAsyncLazy(async () => {
    setProp(swal, "swal", window);

    /* check local storage client_version */
    try {
      const k = "client_version";
      const old = localStorage[k];
      if (old) {
        const os = to_semver(old);
        const ns = to_semver(client_version);
        if (!is_compatible(os, ns)) {
          console.log("Incompatible update: reset localStorage");
          localStorage.clear();
        }
      }
      localStorage[k] = client_version;
    } catch (e) {
      console.error(e);
      localStorage.clear();
      localStorage["client_version"] = client_version;
    }

    LoadingComponent.defaultImgSrc = assets.img.loading;
  });
}

config.initialize();

export const nextPageNavOptions: NavOptions = {
  animate: true
  , direction: "forward"
};
export const prevPageNavOptions: NavOptions = {
  animate: true
  , direction: "back"
};
