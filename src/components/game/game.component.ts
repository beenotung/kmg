import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";

const urls = ["http://localhost:3000", "https://kmg.surge.sh"];

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
    this.iframe.onerror = e => {
      console.error("iframe error:", e);
      this.urlIdx = (this.urlIdx + 1) % urls.length;
      iframe.src = urls[this.urlIdx];
    };
    iframe.src = urls[this.urlIdx];
  }

  ngOnDestroy() {
  }

  reloadGame() {
    this.iframe.src += "";
  }
}
