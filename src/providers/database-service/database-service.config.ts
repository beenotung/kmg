import {createAsyncLazy} from "@beenotung/tslib/src/lazy";
import {createDefer} from "@beenotung/tslib/src/async";
import {setProp} from "@beenotung/tslib/src/functional";
import {bindFunction} from "@beenotung/tslib/src/lang";
import {externalAPI} from "@beenotung/tslib/src/externAPI";

export namespace DBConfig {
  export const db_version = "0.4.0";
  export let network_retry_interval = 8000;

  export const mode: "dev" | "test" | "prod" = "dev";
  // export const mode: 'dev' | 'test' | 'prod' = 'test';

  const server_name = <any>mode === "dev" && location.host == "localhost:8100" ? "STUB" : "td-tmp";

  class Delayed {
    serverIp: string;
    serverPort: number;
    serverHost = () => `${this.serverIp}:${this.serverPort}`;
    serverUrlBase = () => `http://${this.serverHost()}/`;
  }

  const delayed = new Delayed();

  /**@remark must be called before loading horizon */
  export const initialize = createAsyncLazy<Delayed>(async () => {
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
      if (location.hostname === "127.0.0.1") {
        /* it wont work without CORS ... */
        const host = await externalAPI.getHostByName(server_name);
        delayed.serverIp = host.ip;
        delayed.serverPort = host.port;
      } else {
        delayed.serverIp = location.hostname;
        delayed.serverPort = +location.port;
      }
    } else {
      delayed.serverIp = location.hostname;
      delayed.serverPort = 8181;
    }

    defer.resolve(delayed);
    return defer.promise;
  });
}


