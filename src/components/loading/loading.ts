import {Component, Input} from "@angular/core";
import {isDefined} from "@beenotung/tslib/src/lang";

/**
 * Generated class for the LoadingComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: "loading",
  templateUrl: "loading.html"
})
export class LoadingComponent {

  @Input()
  imgWidth: number | string;
  @Input()
  imgHeight: number | string;

  constructor() {
    console.log("Hello LoadingComponent Component");
  }

  customSize(): boolean {
    return isDefined(this.imgHeight) || isDefined(this.imgWidth);
  }
}
