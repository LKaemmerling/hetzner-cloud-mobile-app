import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {IonicStorageModule} from "@ionic/storage";
import {HetznerAppModule} from "../../../modules/hetzner-app/hetzner-app.module";
import {HetznerCloudDataModule} from "../../../modules/hetzner-cloud-data/hetzner-cloud-data.module";
import {PipesModule} from "../../../pipes/pipes.module";
import {HetznerAppComponentsModule} from "../../../components/hetzner-app-components.module";
import {changeIPv6ReverseDNSModal} from "./reverseDNS/ipv6/changeIPv6ReverseDNS";
import {rescueModeModal} from "./rescueMode/rescueMode";
import {changeIPv4ReverseDNSModal} from "./reverseDNS/ipv4/changeIPv4ReverseDNSModal";
import {consoleModal} from "./console/console";
import {ServersPage} from "./serverList/servers";
import {addServerModal} from "./addServer/addServer";
import {ServerMetricsPage} from "./server-metrics/server-metrics";
import {ServerPage} from "./server";
import {resizeServerModal} from "./resizeServer/resizeServer";
import {editServerModal} from "./editServer/editServer";
import {powerSettingsModal} from "./powerSettings/powerSettings";
import {backupSettingsModal} from "./backupSettings/backupSettings";
import {TooltipsModule} from "ionic-tooltips";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    ServersPage,
    ServerPage,
    addServerModal,
    editServerModal,
    powerSettingsModal,
    rescueModeModal,
    resizeServerModal,
    backupSettingsModal,
    changeIPv4ReverseDNSModal,
    changeIPv6ReverseDNSModal,
    ServerMetricsPage,
    consoleModal
  ],
  imports: [
    HetznerAppComponentsModule,
    IonicPageModule,
    TranslateModule,
    HetznerAppModule,
    HetznerCloudDataModule,
    IonicStorageModule,
    PipesModule,
    BrowserAnimationsModule,
    ChartsModule,
    TooltipsModule
  ],
  entryComponents: [
    ServersPage,
    ServerPage,
    addServerModal,
    editServerModal,
    powerSettingsModal,
    rescueModeModal,
    resizeServerModal,
    backupSettingsModal,
    changeIPv4ReverseDNSModal,
    changeIPv6ReverseDNSModal,
    ServerMetricsPage,
    consoleModal
  ]
})
export class ServerPagesModule {
}
