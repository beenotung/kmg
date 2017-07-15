import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the ShortIdPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'shortID',
})
export class ShortIdPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if (!value) {
      return value;
    }
    return value.split('-')[0];
  }
}
