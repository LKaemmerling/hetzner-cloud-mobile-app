import {NgModule} from '@angular/core';
import {AccountPagesModule} from "./account/AccountPages.module";
import {ServerPagesModule} from "./server/server-pages.module";
import {StorageBoxPagesModule} from "./storage-box/storage-box-pages.module";

@NgModule({
  imports: [
    AccountPagesModule,
    ServerPagesModule,
    StorageBoxPagesModule
  ]
})
export class RobotAppPagesModule {
}
