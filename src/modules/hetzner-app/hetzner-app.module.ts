import {NgModule} from '@angular/core';
import {ConfigService} from "./config/config.service";
import {NetworkProvider} from "./network/network";
import {Network} from "@ionic-native/network";
import {TruncatePipe} from "./pipes/truncate/truncate";
import {PriceReplacePipe} from "./pipes/price-replace/price-replace";
import {FileSizePipe} from "./pipes/file-size/file-size";
import {FormatMinutesPipe} from "./pipes/format-minutes/format-minutes";
import {TrackingService} from "./tracking/tracking.service";
import {MoneyFormatPipe} from "./pipes/money-format/money-format";

/**
 * This module register all provider for the basic usage of the app.
 */
@NgModule({
  declarations: [
    FileSizePipe,
    PriceReplacePipe,
    TruncatePipe,
    FormatMinutesPipe,
    MoneyFormatPipe
  ],
  imports: [],
  providers: [Network, NetworkProvider, ConfigService, TrackingService],
  exports: [
    FileSizePipe,
    PriceReplacePipe,
    TruncatePipe,
    FormatMinutesPipe,
    MoneyFormatPipe
  ]
})

export class HetznerAppModule {

}
