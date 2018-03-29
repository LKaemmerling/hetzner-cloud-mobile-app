import {Storage} from "@ionic/storage";
import {Injectable} from '@angular/core';
import {Price, Pricing} from "./pricings";
import {PricesApiProvider} from "../../../providers/pricing-api/pricing-api";

@Injectable()
export class PricingService {
  /**
   *
   * @type {any[]}
   */
  public prices: Pricing = null;

  /**
   *
   * @param {Storage} storage
   * @param {PricesApiProvider} pricingApiProvider
   */
  constructor(private storage: Storage, private pricingApiProvider: PricesApiProvider) {
    this.prices = null;
  }

  /**
   *
   * @param {string} identifier
   * @returns {any}
   */
  public getPrice(identifier: string) {
    console.log(this.prices)
    if (this.prices == null) {
      return identifier;
    }
    return this.index(this.prices, identifier);
  }

  /**
   *
   */
  public loadPrices() {
    return this.storage.get('prices').then((val) => {
      if (val !== undefined) {
        this.prices = val;
      }
    });
  }

  /**
   *
   */
  protected savePrices() {
    return this.storage.set('prices', this.prices);
  }

  /**
   *
   * @returns {Promise<void>}
   */
  public reloadPrices() {
    return this.pricingApiProvider.getPrices().then((data) => {
      this.prices = data['pricing'];
      this.prices['latest_update'] = 'date::' + Date.now().toString();
      this.savePrices();
    });
  }

  private index(obj, is, value = undefined) {
    if (typeof is == 'string')
      return this.index(obj, is.split('.'), value);
    else if (is.length == 1 && value !== undefined)
      return obj[is[0]] = value;
    else if (is.length == 0)
      return obj;
    else
      return this.index(obj[is[0]], is.slice(1), value);
  }
}
