import {Storage} from "@ionic/storage";
import {Injectable} from '@angular/core';
import {NetworkProvider} from "../hetzner-app/network/network";
import {AccountService} from "./accounts/account.service";
import {ServersService} from "./servers/servers.service";
import {StorageBoxService} from "./storage-box/storage-box.service";

/**
 * Service that centralised all methods for the storage
 */
@Injectable()
export class HetznerRobotDataService {
  /**
   * Constructor
   * @param {NetworkProvider} network
   * @param {AccountService} accountService
   * @param {Storage} storage
   */
  constructor(
    protected network: NetworkProvider,
    protected accountService: AccountService,
    protected serversService: ServersService,
    protected storageBoxService: StorageBoxService,
    protected storage: Storage) {

  }

  /**
   * Load all available data from the api (network)
   */
  public loadDataFromNetwork() {
    this.serversService.reloadServers();
    this.storageBoxService.reloadStorageBoxes();
  }

  /**
   * Load all available data from the local storage
   */
  public loadDataFromStorage() {
    this.serversService.loadServers();
    this.storageBoxService.loadStorageBoxes();
  }

  /**
   * This methods loads the data if there is a network connection from the api, if not from the storage
   * @returns {Promise<any>}
   */
  loadData() {
    return new Promise((resolve, reject) => {
      this.accountService.loadAccounts().then(() => {
        if (this.network.has_connection == true) {
          this.loadDataFromNetwork();
          this.storage.set('robot_last_reload', 'date::' + Date.now().toString())
        } else {
          this.loadDataFromStorage();
        }
        resolve();
      }, () => {
        reject();
      })
    });
  }
}
