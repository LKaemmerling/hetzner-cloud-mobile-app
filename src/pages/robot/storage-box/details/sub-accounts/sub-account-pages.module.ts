import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TranslateModule} from '@ngx-translate/core';
import {IonicStorageModule} from '@ionic/storage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TooltipsModule} from 'ionic-tooltips';

import {StorageBoxListPage} from "../../list/storage-box-list";
import {StorageBoxDetailPage} from "../storage-box-details";
import {StorageBoxEditModal} from "../../edit/storage-box-edit";
import {HetznerAppComponentsModule} from "../../../../../components/hetzner-app-components.module";
import {HetznerAppModule} from "../../../../../modules/hetzner-app/hetzner-app.module";
import {HetznerRobotDataModule} from "../../../../../modules/hetzner-robot-data/hetzner-robot-data.module";
import {StorageBoxSubAccountsListPage} from "./list/sub-accounts-list";

@NgModule({
  declarations: [StorageBoxSubAccountsListPage],
  imports: [
    HetznerAppComponentsModule,
    IonicPageModule,
    TranslateModule,
    HetznerAppModule,
    HetznerRobotDataModule,
    IonicStorageModule,
    BrowserAnimationsModule,
    TooltipsModule,
  ],
  entryComponents: [StorageBoxSubAccountsListPage],
})
export class SubAccountPagesModule {
}
