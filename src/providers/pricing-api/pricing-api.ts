import {Injectable} from '@angular/core';
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";

/**
 * This is the provider that performs the api calls to the pricing api.
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
