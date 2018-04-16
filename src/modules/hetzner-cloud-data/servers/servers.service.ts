import {Storage} from "@ionic/storage";
import {Injectable} from '@angular/core';
import {ServerApiProvider} from "../../hetzner-cloud-api/server-api/server-api";
import {Server} from "./server";
/**
 * Service that contains all storage methods for the servers.
 */
@Injectable()
export class ServersService {
  /**
   * All servers
   * @type {any[]}
   */
  public servers: Array<any> = [];

  /**
   * Constructor
   * @param {Storage} storage
   * @param {ServerApiProvider} serverApiProvider
   */
  constructor(private storage: Storage, private serverApiProvider: ServerApiProvider) {
    this.servers = [];
  }

  /**
   * Load all servers from the local storage
   */
  public loadServers() {
    return this.storage.get('servers').then((val) => {
      if (val !== undefined) {
        this.servers = val;
      }
    });
  }

  /**
   * Save all servers to the local storage
   */
  public saveServers() {
    return this.storage.set('servers', this.servers);
  }

  /**
   * Load all servers from the api and save it
   * @returns {Promise<void>}
   */
  public reloadServers() {
    return this.serverApiProvider.getServers().then((data) => {
      this.servers = data['servers'];
      this.saveServers();
    });
  }

  /**
   * Return all Servers with a specific data value
   * @param {string} key
   * @param equals
   * @returns {Array<Server>}
   */
  public getServersByEqualsData(key: string, equals: any): Array<Server> {
    let tmp: Array<Server> = [];

    this.servers.forEach((server) => {
      if (server[key] == equals) {
        tmp.push(server);
      }
    });
    return tmp;
  }

  /**
   * Return all Servers without a specific data value
   * @param {string} key
   * @param equals
   * @returns {Array<Server>}
   */
  public getServersByEqualsNotData(key: string, equals: any): Array<Server> {
    let tmp: Array<Server> = [];

    this.servers.forEach((server) => {
      if (server[key] != equals) {
        tmp.push(server);
      }
    });
    return tmp;
  }
}
