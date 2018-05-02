import {NgModule} from '@angular/core';
import {AccountService} from "./accounts/account.service";
import {HetznerRobotDataService} from "./hetzner-robot-data.service";
import {HetznerRobotMenuService} from "./hetzner-robot-menu.service";
import {ServersService} from "./servers/servers.service";
import {StorageBoxService} from "./storage-box/storage-box.service";
import {SshKeysService} from "./ssh-keys/ssh-keys.service";


/**
 * This module register all services for the data handling of the he app.
 */
@NgModule({
  providers: [
    HetznerRobotDataService,
    HetznerRobotMenuService,
    AccountService,
    ServersService,
    StorageBoxService,
    SshKeysService
  ]
})
export class HetznerRobotDataModule {

}
