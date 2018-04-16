import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {IonicStorageModule} from "@ionic/storage";
import {HetznerAppModule} from "../../../modules/hetzner-app/hetzner-app.module";
import {HetznerCloudDataModule} from "../../../modules/hetzner-cloud-data/hetzner-cloud-data.module";
import {ActionsPage} from "./actions";
import {HetznerAppComponentsModule} from "../../../components/hetzner-app-components.module";

@NgModule({
  declarations: [
    ActionsPage
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
    ActionsPage
  ]
})
export class ActionPagesModule {
}
