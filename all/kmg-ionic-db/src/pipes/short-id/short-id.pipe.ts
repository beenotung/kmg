import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "shortID"
})
export class ShortIdPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args: any[]) {
    if (!value) {
      return value;
    }
    return value.split("-")[0];
  }
}
