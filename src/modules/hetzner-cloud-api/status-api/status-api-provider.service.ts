import {Injectable} from "@angular/core";
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";
import {HttpHeaders} from "@angular/common/http";

/**
 * This is the provider that performs the api calls to the status api.
 */
@Injectable()
export class StatusApiProvider extends HetznerApiProvider {
  /**
   * The url of the status api
   * @type {string}
   */
  protected apiUrl: string = 'https://hetzner-status.lkdev.co/api';

  /**
   * Get all Status from the LK-Network Hetzner Status API
   * @see https://hetzner-status.lkdev.co/api/hetzner-status
   * @returns {Promise<any>}
   */
  getStatus() {
    return this._get('v2/messages')
  }

  hasIpIssues(ip: string) {
    return this._get('traceing/' + ip + '/issues');
  }

  /**
   * Performs a GET Request against the Hetzner API
   * @param {string} method
   * @returns {Promise<any>}
   * @private
   */
  _get(method: string) {
    return new Promise((resolve, reject = null) => {
      this.http.get(this.apiUrl + '/' + method, {
        headers: this.getHeaders(),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        if (reject != null) {
          reject(err);
        }
      });
    });
  }

  protected getHeaders() {
    return new HttpHeaders().set('App-Agent', "My Hetzner/" + this.configService.build + ' (' + this.configService.version + ')');
  }
}
