import {Storage} from "@ionic/storage";
import {Injectable} from '@angular/core';
import {NetworkProvider} from "../../hetzner-app/network/network";
import {SshKeysApiProvider} from "../../hetzner-robot-api/ssh-key-api/ssh-keys-api";

/**
 * Service that contains all storage methods for the robot accounts.
 */
@Injectable()
export class SshKeysService {
  /**
   * All ssh_keys
   * @type {any[]}
   */
  public ssh_keys: any = [];

  /**
   * Constructor
   * @param {Storage} storage
   * @param {NetworkProvider} network
   */
  constructor(private storage: Storage, private sshKeyApi: SshKeysApiProvider) {
    this.ssh_keys = [];
  }

  /**
   * Load all accounts from the local storage
   */
  public loadSSHKeys() {
    return new Promise((resolve, reject) => {
      this.storage.get('robot_ssh_keys').then((val) => {
        if (val !== undefined) {
          this.ssh_keys = val;
        }
      });

    });
  }

  /**
   * Save all accounts to the storage
   */
  public saveSshKeys() {
    this.storage.set('robot_ssh_keys', this.ssh_keys);
  }

  /**
   * Load all servers from the api and save it
   * @returns {Promise<void>}
   */
  public reloadSshKeys() {
    return this.sshKeyApi.all().then((data) => {
      this.ssh_keys = data;
      this.saveSshKeys();
    });
  }
}
