import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HetznerAppModule} from "../hetzner-app/hetzner-app.module";
import {ServerApiProvider} from "./server-api/server-api";
import {StorageBoxApiProvider} from "./storage-box-api/storage-box-api";
import {SshKeysApiProvider} from "../hetzner-robot-api/ssh-key-api/ssh-keys-api";
import {HTTP} from "@ionic-native/http";


/**
 * This module register all services for the data handling of the hetzner cloud app.
 */
@NgModule({
  imports: [HttpClientModule, HetznerAppModule],
  providers: [
    HTTP,
    ServerApiProvider,
    StorageBoxApiProvider,
    SshKeysApiProvider
  ]
})
export class HetznerRobotApiModule {

}
