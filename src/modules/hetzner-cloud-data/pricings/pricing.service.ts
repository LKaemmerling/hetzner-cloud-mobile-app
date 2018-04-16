import {Storage} from "@ionic/storage";
import {Injectable} from '@angular/core';
import {Pricing} from "./pricings";
import {PricesApiProvider} from "../../hetzner-cloud-api/pricing-api/pricing-api";
/**
 * Service that contains all storage methods for the prices.
 */
@Injectable()
export class PricingService {
  /**
   * All available prices
   * @type {Pricing}
   */
  public prices: Pricing = null;

  /**
   * Constructor
   * @param {Storage} storage
   * @param {PricesApiProvider} pricingApiProvider
   */
  constructor(private storage: Storage, private pricingApiProvider: PricesApiProvider) {
    this.prices = null;
  }

  /**
   * Get a specific price
   * @param {string} identifier
   * @returns {any}
   */
  public getPrice(identifier: string) {
    if (this.prices == null) {
      return identifier;
    }
    return this.index(this.prices, identifier);
  }

  /**
   * Load all prices from the local storage
   */
  public loadPrices() {
    return this.storage.get('prices').then((val) => {
      if (val !== undefined) {
        this.prices = val;
      }
    });
  }

  /**
   * Save all prices to the local storage
   */
  protected savePrices() {
    return this.storage.set('prices', this.prices);
  }

  /**
   * Reload all prices from the api and save it to the local storage
   * @returns {Promise<void>}
   */
  public reloadPrices() {
    return this.pricingApiProvider.getPrices().then((data) => {
      this.prices = data['pricing'];
      this.prices['latest_update'] = 'date::' + Date.now().toString();
      this.savePrices();
    });
  }

  /**
   * Method of the easy access on object properties with the dot.string notation
   * @param obj
   * @param is
   * @param {any} value
   * @returns {any}
   */
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
