import {Component, Input} from '@angular/core';

/**
 * Generated class for the MenuSelectorButtonComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'menu-selector-button',
  templateUrl: 'menu-selector-button.html'
})
export class MenuSelectorButtonComponent {

  @Input()
  textContent: string;

  @Input()
  left_icon: string = 'star-outline';

  @Input()
  right_icon: string = 'ios-arrow-forward';

  constructor() {
    console.log('Hello MenuSelectorButtonComponent Component');
  }

}
