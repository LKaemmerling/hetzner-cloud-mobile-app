import {Storage} from "@ionic/storage";
import {Injectable} from '@angular/core';
import {SshKeyApiProvider} from "../../hetzner-cloud-api/ssh-key-api/ssh-key-api";

/**
 * Service that contains all storage methods for the ssh keys.
 */
@Injectable()
export class SshKeysService {
  /**
   * All ssh keys
   * @type {any[]}
   */
  public ssh_keys: Array<any> = [];

  /**
   * Constructor
   * @param {Storage} storage
   * @param {SshKeyApiProvider} sshKeyApProvider
   */
  constructor(private storage: Storage, private sshKeyApProvider: SshKeyApiProvider) {
    this.ssh_keys = [];
  }

  /**
   * Load all ssh keys from the local storage
   */
  public loadSshKeys() {
    return this.storage.get('ssh_keys').then((val) => {
      if (val !== undefined) {
        this.ssh_keys = val;
      }
    });
  }

  /**
   * Save all ssh keys to the local storage
   */
  public saveSshKeys() {
    return this.storage.set('ssh_keys', this.ssh_keys);
  }

  /**
   * Load all ssh keys from the api and save it to the local storage
   * @returns {Promise<void>}
   */
  public reloadSshKeys() {
    return this.sshKeyApProvider.getSSHKeys().then((data) => {
      this.ssh_keys = data['ssh_keys'];
      this.saveSshKeys();
    });
  }
}
