import {Injectable} from '@angular/core';
import {BaseApiProvider} from "../base-api/base-api";

/**
 * This is the provider that performs the api calls to the server api.
 */
@Injectable()
export class SshKeysApiProvider extends BaseApiProvider {

  /**
   * Returns all existing ssh-key objects
   * @see https://robot.your-server.de/doc/webservice/de.html#ssh-schlussel
   * @param {string} searchTerm
   * @returns {Promise<any>}
   */
  all() {
    return this._get('key')
  }

  /**
   * Returns a specific Server object. The Server must exist inside the account
   * @see https://robot.your-server.de/doc/webservice/de.html#get-key-fingerprint
   * @param {string} fingerprint
   * @returns {Promise<any>}
   */
  get(fingerprint: string) {
    return this._get('key/' + fingerprint)
  }

  /**
   * @see https://robot.your-server.de/doc/webservice/de.html#post-key-fingerprint
   * @param {string} fingerprint
   * @param {string} name
   * @returns {Promise<any>}
   */
  update(fingerprint: string, name: string) {

    return this._post('key/' + fingerprint, {name: name})
  }

  /**
   * Returns a specific Server object. The Server must exist inside the account
   * @see https://robot.your-server.de/doc/webservice/de.html#get-key-fingerprint
   * @param {string} fingerprint
   * @returns {Promise<any>}
   */
  delete(fingerprint: string) {
    return this._delete('key/' + fingerprint)
  }

}
