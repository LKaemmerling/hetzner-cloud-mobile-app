import {NgModule} from '@angular/core';
import {ProjectPagesModule} from "./projects/ProjectPages.module";
import {ImagePagesModule} from "./images/image-pages.module";
import {SshKeyPagesModule} from "./sshkeys/ssh-key-pages.module";
import {ActionPagesModule} from "./actions/action-pages.module";
import {FloatingIpPagesModule} from "./floatingIPs/floating-ip-pages.module";
import {ServerPagesModule} from "./server/server-pages.module";

@NgModule({
  imports: [
    ProjectPagesModule,
    ImagePagesModule,
    SshKeyPagesModule,
    ActionPagesModule,
    FloatingIpPagesModule,
    ServerPagesModule
  ]
})
export class CloudAppPagesModule {
}
