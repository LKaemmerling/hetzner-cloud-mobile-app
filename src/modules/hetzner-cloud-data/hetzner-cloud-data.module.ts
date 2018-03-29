import {NgModule} from '@angular/core';
import {ServersService} from "./servers/servers.service";
import {ProjectsService} from "./project/projects.service";
import {PricingService} from "./pricings/pricing.service";
import {SshKeysService} from "./ssh-keys/ssh-keys.service";
import {ImagesService} from "./images/images.service";
import {LocationsService} from "./locations/locations.service";
import {ServerTypesService} from "./server-types/server-types.service";
import {HetznerCloudDataService} from "./hetzner-cloud-data.service";


@NgModule({
  imports: [],
  providers: [HetznerCloudDataService, ServersService, ProjectsService, PricingService, SshKeysService, ImagesService, LocationsService, ServerTypesService]
})
export class HetznerCloudDataModule {

}
