import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";

const urls = ["phaser.html", "http://localhost:3000", "https://kmg.surge.sh"];

@Component({
  selector: "game-cmp",
  templateUrl: "game.component.html"
})
export class GameComponent implements OnInit, OnDestroy {
  urlIdx = 0;

  @ViewChild("gameRoot") gameRoot: ElementRef;
  iframe: HTMLIFrameElement;

  constructor() {
    console.log("Hello GameComponent Component");
  }

  ngOnInit() {
    const iframe = this.iframe = this.gameRoot.nativeElement as HTMLIFrameElement;
    iframe.onerror = e => {
      console.error("iframe error:", e);
      this.urlIdx++;
      /* only reconnect when using localhost */
      if (this.urlIdx < urls.length) {
        iframe.src = urls[this.urlIdx];
      }
    };
    iframe.onloadeddata = e => {
      console.log("iframe loaded data", e);
    };
    iframe.src = urls[this.urlIdx];
  }

  ngOnDestroy() {
  }

  reloadGame() {
    this.urlIdx = 0;
    this.iframe.src = urls[this.urlIdx];
  }

  nextUrl() {
    this.urlIdx = (this.urlIdx + 1) % urls.length;
    this.iframe.src = urls[this.urlIdx];
  }
}
