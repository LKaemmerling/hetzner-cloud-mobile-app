import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HetznerAppModule} from "../hetzner-app/hetzner-app.module";
import {ServerApiProvider} from "./server-api/server-api";
import {TokenInterceptor} from "./base-api/base-api";
import {StorageBoxApiProvider} from "./storage-box-api/storage-box-api";


/**
 * This module register all services for the data handling of the hetzner cloud app.
 */
@NgModule({
  imports: [HttpClientModule, HetznerAppModule],
  providers: [
    ServerApiProvider,
    StorageBoxApiProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class HetznerRobotApiModule {

}
