import {NgModule} from '@angular/core';
import {ServersService} from "./servers/servers.service";
import {ProjectsService} from "./project/projects.service";
import {PricingService} from "./pricings/pricing.service";


@NgModule({
  imports: [],
  providers: [ServersService, ProjectsService, PricingService]
})
export class HetznerCloudDataModule {

}
