import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {IonicStorageModule} from "@ionic/storage";
import {HetznerAppModule} from "../../../modules/hetzner-app/hetzner-app.module";
import {HetznerCloudDataModule} from "../../../modules/hetzner-cloud-data/hetzner-cloud-data.module";
import {PipesModule} from "../../../pipes/pipes.module";
import {ImagesPage} from "./images";
import {editImageModal} from "./editImage/editImage";
import {HetznerAppComponentsModule} from "../../../components/hetzner-app-components.module";

@NgModule({
  declarations: [
    ImagesPage,
    editImageModal
  ],
  imports: [
    HetznerAppComponentsModule,
    IonicPageModule,
    TranslateModule,
    HetznerAppModule,
    HetznerCloudDataModule,
    IonicStorageModule,
    PipesModule
  ],
  entryComponents: [
    ImagesPage,
    editImageModal
  ]
})
export class ImagePagesModule {
}
