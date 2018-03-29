import {Pipe, PipeTransform} from '@angular/core';
import {PricingServices} from "../../models/pricings/PricingServices";
import {isNumeric} from "rxjs/util/isNumeric";

let dateFormat = require('dateformat');
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the PriceReplacePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'replacePrice',
})
export class PriceReplacePipe implements PipeTransform {
  constructor(protected prices: PricingServices, protected translate: TranslateService) {

  }

  /**
   * Takes a value and replace
   */
  transform(value: string, ...args) {
    var values = value.match(/\<<(.*?)\>>/g);
    if (values != null) {
      values.forEach((val, key) => {
        let without_brackets = val.replace('<<', '').replace('>>', '');
        let price = this.prices.getPrice(without_brackets.toLowerCase());
        if (isNumeric(price)) {
          price = Number(price).toFixed(2);
        }
        if (price.startsWith('date::')) {
          price = new Date(Number(price.replace('date::', '')));
          var format = '';
          this.translate.get('GLOBAL.DATE_FORMAT').subscribe(text => {
            format = text;
          });
          price = dateFormat(price, format);
        }
        value = value.replace(val, price)
      })
      return value;
    } else {
      return value;
    }
  }
}
