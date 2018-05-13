import {Storage} from "@ionic/storage";
import {Injectable} from '@angular/core';
import {ServerApiProvider} from "../../hetzner-cloud-api/server-api/server-api";
import {Server} from "./server";
import {StatusApiProvider} from "../../hetzner-cloud-api/status-api/status-api-provider.service";

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
  constructor(private storage: Storage, private serverApiProvider: ServerApiProvider, private statusApiProvider: StatusApiProvider) {
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

  /**
   * Get the cloud host id from the server, from the cache or from the api
   * @param {Server} server
   * @returns {Promise<any>}
   */
  public get_cloud_host(server: Server) {
    return new Promise((resolve) => {
      this.storage.get('cloud_host_cache_' + server.id).then((val) => {
        if (val != undefined) {
          if ((val.time + (1000 * 60 * 60 * 24)) < Date.now()) {
            this.write_cloud_host_cache(server.id, server.public_net.ipv4.ip).then((cloud_host_id) => {
              resolve(cloud_host_id);
            });
          } else {
            resolve(val.cloud_host_id)
          }
        } else {
          this.write_cloud_host_cache(server.id, server.public_net.ipv4.ip).then((cloud_host_id) => {
            resolve(cloud_host_id);
          });
        }
      });
    });
  }

  /**
   * Write the current cloud host id to the cache for 24 h
   * @param {number} id
   * @param {string} ip
   * @returns {Promise<any>}
   */
  protected write_cloud_host_cache(id: number, ip: string) {
    return new Promise((resolve) => {
      this.statusApiProvider.getCloudHost(ip).then((data) => {
        this.storage.set('cloud_host_cache_' + id, {time: Date.now(), cloud_host_id: data['cloud_id']});
        resolve(data['cloud_id']);
      });
    });
  }
}
