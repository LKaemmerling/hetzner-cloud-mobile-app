import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectsPage } from './projects';
import { shareProjectModal } from './shareProject/shareProject';
import { editProjectModal } from './editProject/editProject';
import { addProjectModal } from './addProject/addProject';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { TranslateModule } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
import { HetznerAppModule } from '../../../modules/hetzner-app/hetzner-app.module';
import { HetznerCloudDataModule } from '../../../modules/hetzner-cloud-data/hetzner-cloud-data.module';
import { NgxQRCodeModule } from '@lkdevelopment/ngx-qrcode/dist';
import {HetznerAppComponentsModule} from "../../../components/hetzner-app-components.module";

@NgModule({
    declarations: [ProjectsPage, shareProjectModal, editProjectModal, addProjectModal],
    imports: [
        IonicPageModule,
        TranslateModule,
        HetznerAppModule,
        HetznerCloudDataModule,
        IonicStorageModule,
        NgxQRCodeModule,
        HetznerAppComponentsModule
    ],
    entryComponents: [ProjectsPage, shareProjectModal, editProjectModal, addProjectModal],
    providers: [BarcodeScanner],
})
export class ProjectPagesModule {}
