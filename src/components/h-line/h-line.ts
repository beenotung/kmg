import {Component, Input} from "@angular/core";

/**
 * Generated class for the HLineComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'h-line',
  templateUrl: 'h-line.html'
})
export class HLineComponent {

  @Input()
  height = '2px';

  @Input()
  color = 'black';

  @Input()
  rawColor = false;

  @Input()
  padding = '0';

  constructor() {
    console.log('Hello HLineComponent Component');
  }

}
