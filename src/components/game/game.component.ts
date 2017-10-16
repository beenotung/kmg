import { Component } from "@angular/core";

/**
 * Generated class for the GameComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "game",
  templateUrl: "game.html"
})
export class GameComponent {

  text: string;

  constructor() {
    console.log("Hello GameComponent Component");
    this.text = "Hello World";
  }

}
