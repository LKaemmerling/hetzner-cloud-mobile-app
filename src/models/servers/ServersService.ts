import {Storage} from "@ionic/storage";
import {Injectable} from '@angular/core';

@Injectable()
export class ServersService {
  /**
   *
   * @type {any[]}
   */
  public servers: Array<any> = [];

  /**
   *
   * @param {Storage} storage
   */
  constructor(private storage: Storage) {
    this.servers = [];
  }

  /**
   *
   */
  public loadServers() {
    this.storage.get('servers').then((val) => {
      if (val !== undefined) {
        this.servers = val;
      }
    });
  }

  /**
   *
   */
  public saveServers() {
    this.storage.set('servers', this.servers);
  }

}
