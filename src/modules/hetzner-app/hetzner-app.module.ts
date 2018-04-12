import {NgModule} from '@angular/core';
import {ConfigService} from "./config/config.service";
import {NetworkProvider} from "./network/network";
import {Network} from "@ionic-native/network";
import {Storage} from "@ionic/storage";

/**
 * This module register all provider for the basic usage of the app.
 */
@NgModule({
  imports: [],
  providers: [Network, NetworkProvider, ConfigService]
})
export class HetznerAppModule {

}
