import {Storage} from "@ionic/storage";
import {Injectable} from '@angular/core';
import {ServerApiProvider} from "../../../providers/server-api/server-api";

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
   * @param {ServerApiProvider} serverApiProvider
   */
  constructor(private storage: Storage, private serverApiProvider: ServerApiProvider) {
    this.servers = [];
  }

  /**
   *
   */
  public loadServers() {
    return this.storage.get('servers').then((val) => {
      if (val !== undefined) {
        this.servers = val;
      }
    });
  }

  /**
   *
   */
  public saveServers() {
    return this.storage.set('servers', this.servers);
  }

  /**
   *
   * @returns {Promise<void>}
   */
  public reloadServers() {
    return this.serverApiProvider.getServers().then((data) => {
      this.servers = data['servers'];
      this.saveServers();
    });
  }
}
