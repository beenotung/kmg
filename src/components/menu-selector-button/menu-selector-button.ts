import {Component, Input} from "@angular/core";

@Component({
  selector: "menu-selector-button",
  templateUrl: "menu-selector-button.html"
})
export class MenuSelectorButtonComponent {

  @Input()
  textContent: string;

  @Input()
  left_icon: string = "star-outline";

  @Input()
  right_icon: string = "ios-arrow-forward";

  constructor() {
    console.log("Hello MenuSelectorButtonComponent Component");
  }

}
