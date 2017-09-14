import {NavOptions} from "ionic-angular";
import {createAsyncLazy} from "@beenotung/tslib/lazy";
import {is_compatible, to_semver} from "@beenotung/tslib/semver";
import {createDefer} from "@beenotung/tslib/async";
import {setProp} from "@beenotung/tslib/functional";
import {bindFunction} from "@beenotung/tslib/lang";
import {externalAPI} from "@beenotung/tslib/externAPI";

export namespace config {
  export const client_version = "0.3.2";
  export const fallbackLang = "en";
  export let typing_speed = 1000 / 30;
  export let network_retry_interval = 8000;

  export const Toast_Duration_Short = 2000;
  export const Toast_Duration_Normal = 4000;
  export const Toast_Duration_Long = 8000;


  export const mode: "dev" | "test" | "prod" = "dev";
  // export const mode: 'dev' | 'test' | 'prod' = 'test';

  const server_name = <any>mode === "dev" && location.host == "localhost:8100" ? "STUB" : "seed";

  class Delayed {
    serverIp: string;
    serverPort: number;
    serverHost = () => `${this.serverIp}:${this.serverPort}`;
    serverUrlBase = () => `http://${this.serverHost()}/`;
  }

  const delayed = new Delayed();

  /**@remark must be called before loading horizon */
  export const initialize = createAsyncLazy<Delayed>(async () => {
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

    const defer = createDefer<Delayed, any>();


    /* redirect horizon websocket */
    const RealWebSocket = WebSocket;

    function WrappedWebSocket(url: string, protocols?: string | string[]) {
      if (url.match(/\/horizon$/i)) {
        const parser = document.createElement("a");
        parser.href = url;
        parser.hostname = delayed.serverIp;
        parser.port = delayed.serverPort + "";
        url = parser.href;
      }
      if (arguments.length == 1) {
        return new RealWebSocket(url);
      } else {
        return new RealWebSocket(url, protocols);
      }
    }

    const realSend = RealWebSocket.prototype.send;
    RealWebSocket.prototype.send = function () {
      console.debug("[ws] send:", arguments);
      realSend.apply(this, arguments);
    };

    WrappedWebSocket.prototype = RealWebSocket.prototype;

    setProp(bindFunction(WrappedWebSocket), "WebSocket", window);


    /* resolve backend url */
    if (server_name != "STUB") {
      const host = await externalAPI.getHostByName(server_name);
      // console.debug('host', host);
      delayed.serverIp = host.ip;
      delayed.serverPort = host.port;
    } else {
      delayed.serverIp = location.hostname;
      delayed.serverPort = 8181;
    }

    defer.resolve(delayed);
    return defer.promise;
  });
}


config.initialize();

export const nextPageNavOptions: NavOptions = {
  animate: true
  , direction: "forward"
};
