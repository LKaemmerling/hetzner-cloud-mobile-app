import {NgModule} from '@angular/core';
import {AccountService} from "./accounts/account.service";
import {HetznerRobotDataService} from "./hetzner-robot-data.service";
import {HetznerRobotMenuService} from "./hetzner-robot-menu.service";
import {ServersService} from "./servers/servers.service";


/**
 * This module register all services for the data handling of the hetzner cloud app.
 */
@NgModule({
  imports: [],
  providers: [
    AccountService,
    ServersService,
    HetznerRobotDataService,
    HetznerRobotMenuService
  ]
})
export class HetznerRobotDataModule {

}
