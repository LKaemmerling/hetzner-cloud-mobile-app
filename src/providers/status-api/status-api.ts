import {Injectable} from '@angular/core';
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";

/*
  Generated class for the StatusApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StatusApiProvider extends HetznerApiProvider {
  /**
   *
   * @type {string}
   */
  public apiUrl: string = 'https://hetzner-status.lkdev.co/api';

  /**
   * Get all Status from the LK-Network Hetzner Status API
   * @see https://hetzner-status.lkdev.co/api/hetzner-status
   * @returns {Promise<any>}
   */
  getStatus(lang: string = 'de') {
    return this._get('hetzner-status/' + lang)
  }

  /**
   * Performs a GET Request against the Hetzner API
   * @param {string} method
   * @returns {Promise<any>}
   * @private
   */
  _get(method: string) {
    return new Promise((resolve, reject = null) => {
      this.http.get(this.apiUrl + '/' + method).subscribe(data => {
        resolve(data);
      }, err => {
        if (reject != null) {
          reject(err);
        }
      });
    });
  }
}
