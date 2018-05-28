import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
import { HetznerAppModule } from '../../../modules/hetzner-app/hetzner-app.module';
import { SshKeyEditModal } from './edit/ssh-key-edit';
import { SshKeyListPage } from './list/ssh-key-list';
import { HetznerAppComponentsModule } from '../../../components/hetzner-app-components.module';
import {HetznerRobotDataModule} from "../../../modules/hetzner-robot-data/hetzner-robot-data.module";

@NgModule({
    declarations: [SshKeyListPage, SshKeyEditModal],
    imports: [
        HetznerAppComponentsModule,
        IonicPageModule,
        TranslateModule,
        HetznerAppModule,
        HetznerRobotDataModule,
        IonicStorageModule,
    ],
    entryComponents: [SshKeyListPage, SshKeyEditModal],
})
export class SshKeyPagesModule {}
