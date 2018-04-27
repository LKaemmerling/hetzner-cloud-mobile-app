import {NgModule} from '@angular/core';
import {ConfigService} from "./config/config.service";
import {NetworkProvider} from "./network/network";
import {Network} from "@ionic-native/network";
import {Storage} from "@ionic/storage";
import {TruncatePipe} from "./pipes/truncate/truncate";
import {PriceReplacePipe} from "./pipes/price-replace/price-replace";
import {FileSizePipe} from "./pipes/file-size/file-size";
import {AppCenterAnalytics} from "@ionic-native/app-center-analytics";

/**
 * This module register all provider for the basic usage of the app.
 */
@NgModule({
  declarations: [
    FileSizePipe,
    PriceReplacePipe,
    TruncatePipe
  ],
  imports: [],
  providers: [Network, NetworkProvider, ConfigService,AppCenterAnalytics],
  exports: [
    FileSizePipe,
    PriceReplacePipe,
    TruncatePipe
  ]
})
export class HetznerAppModule {

}
