import {ErrorHandler, Injectable, Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {HetznerCloudMobileApp} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AboutPage} from '../pages/about/about';
import {HomePage} from '../pages/home/home';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {IonicStorageModule} from '@ionic/storage';
import {ProjectModule} from "../models/project/project.module";
import {ProjectsPage} from "../pages/projects/projects";
import {addProjectModal} from "../pages/projects/addProject/addProject";
import {ServersPage} from "../pages/server/serverList/servers";
import {Pro} from '@ionic/pro';
import {ServerPage} from "../pages/server/server";
import {addServerModal} from "../pages/server/addServer/addServer";
import {editServerModal} from "../pages/server/editServer/editServer";
import {powerSettingsModal} from "../pages/server/powerSettings/powerSettings";
import {rescueModeModal} from "../pages/server/rescueMode/rescueMode";
import {resizeServerModal} from "../pages/server/resizeServer/resizeServer";
import {backupSettingsModal} from "../pages/server/backupSettings/backupSettings";
import {addFloatingIPModal} from "../pages/floatingIPs/addFloatingIp/addFloatingIP";
import {FloatingIPsPage} from "../pages/floatingIPs/floatingIPs";
import {DeleteAllDataPage} from "../pages/delete-all-data/delete-all-data";
import {PipesModule} from "../pipes/pipes.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TooltipsModule} from "ionic-tooltips";
import {changeIPv4ReverseDNSModal} from "../pages/server/reverseDNS/ipv4/changeIPv4ReverseDNSModal";
import {changeIPv6ReverseDNSModal} from "../pages/server/reverseDNS/ipv6/changeIPv6ReverseDNS";
import {editFloatingIpModal} from "../pages/floatingIPs/editFloatingIp/editFloatingIp";
import {FloatingIPPage} from "../pages/floatingIPs/floatingIp/floatingIP";
import {ImagesPage} from "../pages/images/images";
import {editImageModal} from "../pages/images/editImage/editImage";
import {assignToServerModal} from "../pages/floatingIPs/assignToServer/assignToServer";
import {ServersModule} from "../models/servers/Servers.module";
import {HetznerStatusSettingPage} from "../pages/hetzner-status-setting/hetzner-status-setting";
import {OneSignal} from "@ionic-native/onesignal";
import {HetznerStatusPage} from "../pages/hetzner-status/hetzner-status";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {ChartsModule} from 'ng2-charts';
import {ServerMetricsPage} from "../pages/server/server-metrics/server-metrics";
import {SettingsPage} from "../pages/settings/settings";
import {AppVersion} from "@ionic-native/app-version";
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";
import {ActionsPage} from "../pages/actions/actions";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HetznerApiProviderModule} from "../providers/hetznerApiProvider.module";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {shareProjectModal} from "../pages/projects/shareProject/shareProject";
import {NgxQRCodeModule} from "@lkdevelopment/ngx-qrcode/dist";
import {ComponentsModule} from "../components/components.module";
import {consoleModal} from "../pages/server/console/console";
import {Keyboard} from "@ionic-native/keyboard";
import {editProjectModal} from "../pages/projects/editProject/editProject";
import {SshkeysPage} from "../pages/sshkeys/sshkeys";
import {editSSHKeyModal} from "../pages/sshkeys/editSSHKey/editSSHKey";

const IonicPro = Pro.init('359b3ec5', {
  appVersion: "1.3.0"
});

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch (e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    IonicPro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
    console.log(err);
  }
}

@NgModule({
  declarations: [
    HetznerCloudMobileApp,
    AboutPage,
    HomePage,
    ProjectsPage,
    addProjectModal,
    shareProjectModal,
    editProjectModal,
    ServersPage,
    ServerPage,
    addServerModal,
    editServerModal,
    powerSettingsModal,
    rescueModeModal,
    resizeServerModal,
    backupSettingsModal,
    FloatingIPsPage,
    addFloatingIPModal,
    DeleteAllDataPage,
    changeIPv4ReverseDNSModal,
    changeIPv6ReverseDNSModal,
    editFloatingIpModal,
    FloatingIPPage,
    ImagesPage,
    editImageModal,
    assignToServerModal,
    HetznerStatusSettingPage,
    HetznerStatusPage,
    ServerMetricsPage,
    SettingsPage,
    ActionsPage,
    consoleModal,
    SshkeysPage,
    editSSHKeyModal
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(HetznerCloudMobileApp),
    IonicStorageModule.forRoot(),
    ProjectModule,
    HttpClientModule,
    PipesModule,
    BrowserAnimationsModule,
    TooltipsModule,
    ServersModule,
    ChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HetznerApiProviderModule,
    NgxQRCodeModule,
    BrowserAnimationsModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HetznerCloudMobileApp,
    AboutPage,
    HomePage,
    ProjectsPage,
    addProjectModal,
    shareProjectModal,
    ServersPage,
    ServerPage,
    addServerModal,
    editServerModal,
    powerSettingsModal,
    rescueModeModal,
    resizeServerModal,
    backupSettingsModal,
    FloatingIPsPage,
    addFloatingIPModal,
    DeleteAllDataPage,
    changeIPv4ReverseDNSModal,
    changeIPv6ReverseDNSModal,
    editFloatingIpModal,
    FloatingIPPage,
    ImagesPage,
    editImageModal,
    assignToServerModal,
    HetznerStatusSettingPage,
    HetznerStatusPage,
    ServerMetricsPage,
    SettingsPage,
    ActionsPage,
    consoleModal,
    editProjectModal,
    SshkeysPage,
    editSSHKeyModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: MyErrorHandler},
    OneSignal,
    InAppBrowser,
    AppVersion,
    FingerprintAIO,
    BarcodeScanner,
    Keyboard
  ]
})
export class AppModule {
}

