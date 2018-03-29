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


@Injectable()
export class HetznerCloudDataService {
  constructor(protected projects: ProjectsService,
              protected servers: ServersService,
              protected sshKeys: SshKeysService,
              protected images: ImagesService,
              protected locations: LocationsService,
              protected prices: PricingService,
              protected serverTypes: ServerTypesService,
              protected network: NetworkProvider,
              protected storage: Storage) {

  }

  loadData() {
    return new Promise((resolve, reject) => {
      this.projects.loadProjects().then(() => {
        if (this.network.has_connection == true) {
          this.prices.reloadPrices();
          this.servers.reloadServers();
          this.sshKeys.reloadSshKeys();
          this.images.reloadImages();
          this.locations.reloadLocations();
          this.serverTypes.reloadServerTypes();
          this.storage.set('last_reload','date::' + Date.now().toString())
        } else {
          this.prices.loadPrices();
          this.servers.loadServers();
          this.sshKeys.loadSshKeys();
          this.images.loadImages();
          this.locations.loadLocations();
          this.serverTypes.loadServerTypes();
        }
        resolve();
      }, () => {
        reject();
      })
    });
  }
}
