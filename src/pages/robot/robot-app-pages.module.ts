import {NgModule} from '@angular/core';
import {AccountPagesModule} from "./account/AccountPages.module";
import {ServerPagesModule} from "./server/server-pages.module";

@NgModule({
  imports: [
    AccountPagesModule,
    ServerPagesModule
  ]
})
export class RobotAppPagesModule {
}
