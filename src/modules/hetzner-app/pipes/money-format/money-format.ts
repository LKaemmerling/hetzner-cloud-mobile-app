import {Pipe, PipeTransform} from '@angular/core';
import {ConfigService} from "../../config/config.service";

/**
 * Generated class for the PriceReplacePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'formatMoney',
})
/**
 *
 */
export class MoneyFormatPipe implements PipeTransform {
  /**
   *
   * @param {ConfigService} config
   */
  constructor(protected config: ConfigService) {

  }

  /**
   * Takes a value and replace
   */
  transform(value: string, ...args) {
    if (this.config.language == 'de') {
      return value.replace('.', ',');
    }
    return value;
  }
}
