import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TranslateModule} from '@ngx-translate/core';
import {IonicStorageModule} from '@ionic/storage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TooltipsModule} from 'ionic-tooltips';
import {HetznerAppComponentsModule} from "../../../../../components/hetzner-app-components.module";
import {HetznerAppModule} from "../../../../../modules/hetzner-app/hetzner-app.module";
import {HetznerRobotDataModule} from "../../../../../modules/hetzner-robot-data/hetzner-robot-data.module";
import {StorageBoxSubAccountsListPage} from "./list/sub-accounts-list";
import {StorageBoxSubAccountAddModal} from "./add/sub-account-add";
import {StorageBoxSubAccountEditModal} from "./edit/sub-account-edit";

@NgModule({
  declarations: [StorageBoxSubAccountsListPage,StorageBoxSubAccountAddModal,StorageBoxSubAccountEditModal],
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
  entryComponents: [StorageBoxSubAccountsListPage,StorageBoxSubAccountAddModal,StorageBoxSubAccountEditModal],
})
export class SubAccountPagesModule {
}
