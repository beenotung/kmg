import {Component, Input} from "@angular/core";

enum Mode {
  theme, raw, nocolor
}

/**
 * Generated class for the HLineComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: "h-line",
  templateUrl: "h-line.html"
})
export class HLineComponent {

  @Input()
  height = "2px";

  @Input()
  color = "black";

  @Input()
  rawColor: boolean | string = false;

  @Input()
  padding = "0";

  @Input()
  nocolor: boolean = false;

  Mode = Mode;

  constructor() {
    console.log("Hello HLineComponent Component");
  }

  get mode(): Mode {
    return this.nocolor !== false
      ? Mode.nocolor
      : this.rawColor == true || typeof this.rawColor === "string"
        ? Mode.raw
        : Mode.theme;
  }

  get _color(): string {
    if (this.mode === Mode.raw) {
      return this.rawColor == true
        ? this.color
        : <string>this.rawColor;
    } else {
      /* mode === theme */
      return this.color;
    }
  }
}

