import {Storage} from "@ionic/storage";
import {Injectable} from '@angular/core';
import {SshKeyApiProvider} from "../../../providers/ssh-key-api/ssh-key-api";

@Injectable()
export class SshKeysService {
  /**
   *
   * @type {any[]}
   */
  public ssh_keys: Array<any> = [];

  /**
   * 
   * @param {Storage} storage
   * @param {SshKeyApiProvider} sshKeyApProvider
   */
  constructor(private storage: Storage, private sshKeyApProvider: SshKeyApiProvider) {
    this.ssh_keys = [];
  }

  /**
   *
   */
  public loadSshKeys() {
    return this.storage.get('ssh_keys').then((val) => {
      if (val !== undefined) {
        this.ssh_keys = val;
      }
    });
  }

  /**
   *
   */
  public saveSshKeys() {
    return this.storage.set('ssh_keys', this.ssh_keys);
  }

  /**
   *
   * @returns {Promise<void>}
   */
  public reloadSshKeys() {
    return this.sshKeyApProvider.getSSHKeys().then((data) => {
      this.ssh_keys = data['ssh_keys'];
      this.saveSshKeys();
    });
  }
}
