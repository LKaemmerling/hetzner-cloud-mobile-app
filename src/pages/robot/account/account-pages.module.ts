import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TranslateModule} from '@ngx-translate/core';
import {IonicStorageModule} from '@ionic/storage';
import {HetznerAppModule} from '../../../modules/hetzner-app/hetzner-app.module';
import {NgxQRCodeModule} from '@lkdevelopment/ngx-qrcode/dist';
import {AccountListPage} from './list/account-list';
import {HetznerRobotDataModule} from '../../../modules/hetzner-robot-data/hetzner-robot-data.module';
import {HetznerRobotApiModule} from '../../../modules/hetzner-robot-api/hetzner-robot-api.module';
import {AccountEditModal} from './edit/account-edit';
import {AccountAddModal} from './add/account-add';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {AccountShareModal} from "./share/account-share";

@NgModule({
  declarations: [AccountListPage, AccountAddModal, AccountEditModal, AccountShareModal],
  imports: [
    IonicPageModule,
    TranslateModule,
    HetznerAppModule,
    HetznerRobotDataModule,
    HetznerRobotApiModule,
    IonicStorageModule,
    NgxQRCodeModule,
  ],
  entryComponents: [AccountListPage, AccountAddModal, AccountEditModal, AccountShareModal],
  providers: [BarcodeScanner]
})
export class AccountPagesModule {
}
