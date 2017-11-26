import {Component} from "@angular/core";

@Component({
  selector: "loading-div",
  templateUrl: "loading-div.html"
})
export class LoadingDivComponent {

  text: string;

  constructor() {
    console.log("Hello LoadingDivComponent Component");
  }

}
