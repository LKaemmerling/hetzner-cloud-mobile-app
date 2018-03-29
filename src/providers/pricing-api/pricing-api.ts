import {Injectable} from '@angular/core';
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";

/*
  Generated class for the ServerApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PricesApiProvider extends HetznerApiProvider {
  /**
   * Returns prices for all resources available on the platform. VAT and currency of the project owner are used for calculations
   * @see https://docs.hetzner.cloud/#resources-pricing-get
   *
   * @returns {Promise<any>}
   */
  getPrices() {
    return this._get('pricing');
  }
}
