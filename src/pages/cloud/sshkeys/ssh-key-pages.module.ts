import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
import { HetznerAppModule } from '../../../modules/hetzner-app/hetzner-app.module';
import { HetznerCloudDataModule } from '../../../modules/hetzner-cloud-data/hetzner-cloud-data.module';
import { editSSHKeyModal } from './editSSHKey/editSSHKey';
import { SshkeysPage } from './sshkeys';
import { HetznerAppComponentsModule } from '../../../components/hetzner-app-components.module';

@NgModule({
    declarations: [editSSHKeyModal, SshkeysPage],
    imports: [
        HetznerAppComponentsModule,
        IonicPageModule,
        TranslateModule,
        HetznerAppModule,
        HetznerCloudDataModule,
        IonicStorageModule,
    ],
    entryComponents: [editSSHKeyModal, SshkeysPage],
})
export class SshKeyPagesModule {}
