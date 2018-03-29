import {NgModule} from '@angular/core';
import {ConfigService} from "./config/config.service";
import {NetworkProvider} from "./network/network";
import {Network} from "@ionic-native/network";

@NgModule({
  imports: [],
  providers: [Network, NetworkProvider, ConfigService]
})
export class HetznerAppModule {

}
