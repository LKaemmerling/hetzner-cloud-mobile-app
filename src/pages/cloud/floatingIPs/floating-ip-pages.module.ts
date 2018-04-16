import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {IonicStorageModule} from "@ionic/storage";
import {HetznerAppModule} from "../../../modules/hetzner-app/hetzner-app.module";
import {HetznerCloudDataModule} from "../../../modules/hetzner-cloud-data/hetzner-cloud-data.module";
import {HetznerAppComponentsModule} from "../../../components/hetzner-app-components.module";
import {FloatingIPsPage} from "./floatingIPs";
import {editFloatingIpModal} from "./editFloatingIp/editFloatingIp";
import {FloatingIPPage} from "./floatingIp/floatingIP";
import {assignToServerModal} from "./assignToServer/assignToServer";
import {addFloatingIPModal} from "./addFloatingIp/addFloatingIP";

@NgModule({
  declarations: [
    FloatingIPsPage,
    FloatingIPPage,
    editFloatingIpModal,
    assignToServerModal,
    addFloatingIPModal
  ],
  imports: [
    HetznerAppComponentsModule,
    IonicPageModule,
    TranslateModule,
    HetznerAppModule,
    HetznerCloudDataModule,
    IonicStorageModule
  ],
  entryComponents: [
    FloatingIPsPage,
    FloatingIPPage,
    editFloatingIpModal,
    assignToServerModal,
    addFloatingIPModal
  ]
})
export class FloatingIpPagesModule {
}
