import {Injectable} from '@angular/core';
import {BaseApiProvider} from "../base-api/base-api";

/**
 * This is the provider that performs the api calls to the server api.
 */
@Injectable()
export class MarketApiProvider extends BaseApiProvider {

  /**
   * Returns all existing Server objects
   * @see https://robot.your-server.de/doc/webservice/en.html#get-server
   * @param {string} searchTerm
   * @returns {Promise<any>}
   */
  products() {
    return this._get('order/server/product')
  }

  orderProduct(product_id: string, authorized_key: Array<any>, password: string, location: string, dist: string = '', arch: string = '', lang: string = '', comment: string = '', test: boolean = false) {
    return this._post("order/server/transaction", {
      product_id: product_id,
      authorized_key: authorized_key,
      password: password,
      location: location,
      dist: dist,
      arch: arch,
      lang: lang,
      comment: comment,
      test: test
    });
  }

  market(search: string = null) {
    return this._get('order/server_market/product?search='+search);
  }

  orderMarket(product_id: string, authorized_key: Array<any>, password: string, dist: string = '', arch: string = '', lang: string = '', comment: string = '', test: boolean = false) {
    return this._post("order/server_market/transaction", {
      product_id: product_id,
      authorized_key: authorized_key,
      password: password,
      dist: dist,
      arch: arch,
      lang: lang,
      comment: comment,
      test: test
    });
  }
}
