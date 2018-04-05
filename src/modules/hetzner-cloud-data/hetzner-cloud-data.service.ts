import {Storage} from "@ionic/storage";
import {Injectable} from '@angular/core';
import {ProjectsService} from "./project/projects.service";
import {SshKeysService} from "./ssh-keys/ssh-keys.service";
import {LocationsService} from "./locations/locations.service";
import {PricingService} from "./pricings/pricing.service";
import {ServerTypesService} from "./server-types/server-types.service";
import {ImagesService} from "./images/images.service";
import {ServersService} from "./servers/servers.service";
import {NetworkProvider} from "../hetzner-app/network/network";
import {FloatingIpsService} from "./floating-ips/floating-ips.service";

/**
 * Service that centralised all methods for the storage
 */
@Injectable()
export class HetznerCloudDataService {
  /**
   * Constructor
   * @param {ProjectsService} projects
   * @param {ServersService} servers
   * @param {SshKeysService} sshKeys
   * @param {ImagesService} images
   * @param {LocationsService} locations
   * @param {PricingService} prices
   * @param {ServerTypesService} serverTypes
   * @param {NetworkProvider} network
   * @param {FloatingIpsService} floatingIps
   * @param {Storage} storage
   */
  constructor(protected projects: ProjectsService,
              protected servers: ServersService,
              protected sshKeys: SshKeysService,
              protected images: ImagesService,
              protected locations: LocationsService,
              protected prices: PricingService,
              protected serverTypes: ServerTypesService,
              protected network: NetworkProvider,
              protected floatingIps: FloatingIpsService,
              protected storage: Storage) {

  }

  /**
   * Load all available data from the api (network)
   */
  public loadDataFromNetwork() {
    this.prices.reloadPrices();
    this.servers.reloadServers();
    this.sshKeys.reloadSshKeys();
    this.images.reloadImages();
    this.locations.reloadLocations();
    this.serverTypes.reloadServerTypes();
    this.floatingIps.reloadFloatingIps();
  }

  /**
   * Load all available data from the local storage
   */
  public loadDataFromStorage() {
    this.prices.loadPrices();
    this.servers.loadServers();
    this.sshKeys.loadSshKeys();
    this.images.loadImages();
    this.locations.loadLocations();
    this.serverTypes.loadServerTypes();
    this.floatingIps.loadFloatingIps();
  }

  /**
   * This methods loads the data if there is a network connection from the api, if not from the storage
   * @returns {Promise<any>}
   */
  loadData() {
    return new Promise((resolve, reject) => {
      this.projects.loadProjects().then(() => {
        if (this.network.has_connection == true) {
          this.loadDataFromNetwork();
          this.storage.set('last_reload', 'date::' + Date.now().toString())
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
