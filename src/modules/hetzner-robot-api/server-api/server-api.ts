import {Injectable} from '@angular/core';
import {BaseApiProvider} from "../base-api/base-api";

/**
 * This is the provider that performs the api calls to the server api.
 */
@Injectable()
export class ServerApiProvider extends BaseApiProvider {

  /**
   * Returns all existing Server objects
   * @see https://robot.your-server.de/doc/webservice/en.html#get-server
   * @param {string} searchTerm
   * @returns {Promise<any>}
   */
  getServers() {
    return this._get('server')
  }

  /**
   * Returns a specific Server object. The Server must exist inside the account
   * @see https://robot.your-server.de/doc/webservice/en.html#get-server-server-ip
   * @param {string} serverIp
   * @returns {Promise<any>}
   */
  getServer(serverIp: string) {
    return this._get('server/' + serverIp)
  }

  update(serverIp: string, server_name: string) {
    return this._post('server/' + serverIp, "server_name=" + server_name)
  }

  /**
   *
   * @param {string} serverIp
   * @returns {Promise<any>}
   */
  getCancellationData(serverIp: string) {
    return this._get('server/' + serverIp + '/cancellation')
  }

  /**
   *
   * @param {string} serverIp
   * @param {string} cancellation_date
   * @param {string} cancellation_reason
   * @returns {Promise<any>}
   */
  cancel(serverIp: string, cancellation_date: string, cancellation_reason: string = null) {
    return this._post('server/' + serverIp, "cancellation_date=" + cancellation_date + "&cancellation_reason=" + cancellation_reason)
  }

  /**
   *
   * @param {string} serverIp
   * @returns {Promise<any>}
   */
  removeCancellation(serverIp: string) {
    return this._delete('server/' + serverIp + '/cancellation')
  }

  resetOptions(serverIp: string) {
    return this._get('reset/' + serverIp)
  }

  reset(serverIp: string, type: string) {
    return this._post('reset/' + serverIp, "type=" + type);
  }
}
