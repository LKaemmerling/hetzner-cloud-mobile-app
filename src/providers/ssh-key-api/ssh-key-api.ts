import {Injectable} from '@angular/core';
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";

/**
 * This is the provider that performs the api calls to the ssh key api.
 */
@Injectable()
export class SshKeyApiProvider extends HetznerApiProvider {


  /**
   * Returns all ssh key objects
   * @see https://docs.hetzner.cloud/#resources-ssh-keys-get
   * @param {string} searchTerm
   * @returns {Promise<any>}
   */
  getSSHKeys(searchTerm: string = null) {
    return this._get('ssh_keys' + (searchTerm == null ? '' : '?name=' + searchTerm))
  }

  /**
   * Creates a new SSH Key with the given name and public_key
   * @see https://docs.hetzner.cloud/#resources-ssh-keys-post
   * @param {string} name
   * @param {string} publicKey
   * @returns {Promise<any>}
   */
  create(name: string, publicKey: string) {
    return this._post('ssh_keys', {name: name, public_key: publicKey});
  }

  /**
   * Changes the name of a ssh key.
   * @see https://docs.hetzner.cloud/#resources-ssh-keys-put
   * @param {number} id
   * @param {string} name
   * @returns {Promise<any>}
   */
  changeName(id: number, name: string) {
    return this._put('ssh_keys/' + id, {name: name});
  }

  /**
   * Deletes a SSH key. It cannot be used anymore.
   * @see https://docs.hetzner.cloud/#resources-ssh-keys-delete
   * @param {number} id
   * @param {string} name
   * @returns {Promise<any>}
   */
  delete(id: number) {
    return this._delete('ssh_keys/' + id);
  }
}
