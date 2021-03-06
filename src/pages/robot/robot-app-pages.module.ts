import { NgModule } from '@angular/core';
import { AccountPagesModule } from './account/account-pages.module';
import { ServerPagesModule } from './server/server-pages.module';
import { StorageBoxPagesModule } from './storage-box/storage-box-pages.module';
import { SshKeyPagesModule } from './sshkeys/ssh-key-pages.module';
import {MarketPagesModule} from "./market/market-pages.module";

@NgModule({
    imports: [AccountPagesModule, ServerPagesModule, StorageBoxPagesModule, SshKeyPagesModule,MarketPagesModule],
})
export class RobotAppPagesModule {}
