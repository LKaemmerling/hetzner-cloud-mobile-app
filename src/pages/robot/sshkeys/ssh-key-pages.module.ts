import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
import { HetznerAppModule } from '../../../modules/hetzner-app/hetzner-app.module';
import { HetznerCloudDataModule } from '../../../modules/hetzner-cloud-data/hetzner-cloud-data.module';
import { SshKeyEditModal } from './edit/ssh-key-edit';
import { SshKeyListPage } from './list/ssh-key-list';
import { HetznerAppComponentsModule } from '../../../components/hetzner-app-components.module';

@NgModule({
    declarations: [SshKeyListPage, SshKeyEditModal],
    imports: [
        HetznerAppComponentsModule,
        IonicPageModule,
        TranslateModule,
        HetznerAppModule,
        HetznerCloudDataModule,
        IonicStorageModule,
    ],
    entryComponents: [SshKeyListPage, SshKeyEditModal],
})
export class SshKeyPagesModule {}
