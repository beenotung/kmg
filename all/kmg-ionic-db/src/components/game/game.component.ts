import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";

@Component({
  selector: "game-cmp",
  templateUrl: "game.component.html"
})
export class GameComponent implements OnInit, OnDestroy {
  static url = "http://localhost:3000";

  @ViewChild("gameRoot") gameRoot: ElementRef;
  iframe: HTMLIFrameElement;

  constructor() {
    console.log("Hello GameComponent Component");
    this.onMessage = this.onMessage.bind(this);
  }

  ngOnInit() {
    const iframe = this.iframe = this.gameRoot.nativeElement as HTMLIFrameElement;
    iframe.src = GameComponent.url;
    window.addEventListener("message", this.onMessage, false);
  }

  ngOnDestroy() {
    window.removeEventListener("message", this.onMessage, false);
  }

  onMessage(event: MessageEvent) {
    if (event.origin !== GameComponent.url) {
      return;
    }
    const data = event.data;
    if (data === "create") {
      this.sendMessage({debug: {fps: true, tps: true}});
      return;
    }
    if (data.fps) {
      this.sendMessage({debug: {fps: false}});
      console.debug(data);
      return;
    }
    if (data.tps) {
      this.sendMessage({debug: {tps: false}});
      console.debug(data);
      return;
    }
    console.debug("received from iframe:", event.data);
  }

  sendMessage(msg: any) {
    this.iframe.contentWindow.postMessage(msg, GameComponent.url);
  }

}
