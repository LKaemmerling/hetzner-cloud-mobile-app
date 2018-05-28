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
  protected apiUrl: string = 'https://backend.hetzner.app/api';

  /**
   * Get all Status from the LK-Network Hetzner Status API
   * @see https://hetzner-status.lkdev.co/api/hetzner-status
   * @returns {Promise<any>}
   */
  getStatus() {
    return this._get('v2/messages')
  }

  trace(ip: string) {
    return this._get('traceing/' + ip);
  }

  getCloudHost(ip: string) {
    return this._get('traceing/' + ip + '/host');
  }

  hasIpIssues(ip: string) {
    return this._get('traceing/' + ip + '/issues');
  }

  registerDevice(os: string, version: string) {
    return this._post('device/create', {os: os, version: version});
  }

  updateDevice(device_id: string, os: string, version: string) {
    return this._put('device/' + device_id, {os: os, version: version});
  }

  performTrack(device_id: string, project: number, access: number) {
    return this._post('device/' + device_id + '/tracking', {projects: project, access: access});
  }

  getRemoteFeatureFlags(device_id: string) {
    return this._get('device/' + device_id + '/feature_flags');
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

  /**
   * Performs a POST Request against the Hetzner API
   * @param {string} method
   * @param {object} body
   * @returns {Promise<any>}
   * @private
   */
  _post(method: string, body: object = {}) {
    return new Promise((resolve, reject = null) => {
      this.http.post(this.apiUrl + '/' + method, body, {
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

  /**
   * Performs a PUT Request against the Hetzner API
   * @param {string} method
   * @param {object} body
   * @returns {Promise<any>}
   * @private
   */
  _put(method: string, body: object) {
    return new Promise((resolve, reject = null) => {
      this.http.put(this.apiUrl + '/' + method, body, {
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
