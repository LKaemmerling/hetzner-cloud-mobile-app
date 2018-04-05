import {NgModule} from '@angular/core';
import {ServersService} from "./servers/servers.service";
import {ProjectsService} from "./project/projects.service";
import {PricingService} from "./pricings/pricing.service";
import {SshKeysService} from "./ssh-keys/ssh-keys.service";
import {ImagesService} from "./images/images.service";
import {LocationsService} from "./locations/locations.service";
import {ServerTypesService} from "./server-types/server-types.service";
import {HetznerCloudDataService} from "./hetzner-cloud-data.service";
import {FloatingIpsService} from "./floating-ips/floating-ips.service";

/**
 * This module register all services for the data handling of the hetzner cloud app.
 */
@NgModule({
  imports: [],
  providers: [
    HetznerCloudDataService,
    ServersService,
    ProjectsService,
    PricingService,
    SshKeysService,
    ImagesService,
    LocationsService,
    FloatingIpsService,
    ServerTypesService
  ]
})
export class HetznerCloudDataModule {

}
