import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TranslateModule} from '@ngx-translate/core';
import {IonicStorageModule} from '@ionic/storage';
import {HetznerAppModule} from '../../../modules/hetzner-app/hetzner-app.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HetznerAppComponentsModule} from '../../../components/hetzner-app-components.module';
import {TooltipsModule} from 'ionic-tooltips';
import {HetznerRobotDataModule} from '../../../modules/hetzner-robot-data/hetzner-robot-data.module';
import {StorageBoxListPage} from './list/storage-box-list';
import {StorageBoxEditModal} from "./edit/storage-box-edit";
import {StorageBoxDetailPage} from "./details/storage-box-details";
import {SubAccountPagesModule} from "./details/sub-accounts/sub-account-pages.module";
import {SnapshotsPagesModule} from "./details/snapshots/snapshots-pages.module.ts";

@NgModule({
  declarations: [StorageBoxListPage, StorageBoxEditModal, StorageBoxDetailPage],
  imports: [
    HetznerAppComponentsModule,
    IonicPageModule,
    TranslateModule,
    HetznerAppModule,
    HetznerRobotDataModule,
    IonicStorageModule,
    BrowserAnimationsModule,
    TooltipsModule,
    SubAccountPagesModule,
    SnapshotsPagesModule
  ],
  entryComponents: [StorageBoxListPage, StorageBoxEditModal, StorageBoxDetailPage],
})
export class StorageBoxPagesModule {
}
