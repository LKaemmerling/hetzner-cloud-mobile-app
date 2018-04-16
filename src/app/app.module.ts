import {ErrorHandler, Injectable, Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {HetznerMobileApp} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {IonicStorageModule} from '@ionic/storage';
import {ServersPage} from "../pages/cloud/server/serverList/servers";
import {Pro} from '@ionic/pro';
import {ServerPage} from "../pages/cloud/server/server";
import {addServerModal} from "../pages/cloud/server/addServer/addServer";
import {editServerModal} from "../pages/cloud/server/editServer/editServer";
import {powerSettingsModal} from "../pages/cloud/server/powerSettings/powerSettings";
import {rescueModeModal} from "../pages/cloud/server/rescueMode/rescueMode";
import {resizeServerModal} from "../pages/cloud/server/resizeServer/resizeServer";
import {backupSettingsModal} from "../pages/cloud/server/backupSettings/backupSettings";
import {addFloatingIPModal} from "../pages/cloud/floatingIPs/addFloatingIp/addFloatingIP";
import {FloatingIPsPage} from "../pages/cloud/floatingIPs/floatingIPs";
import {PipesModule} from "../pipes/pipes.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TooltipsModule} from "ionic-tooltips";
import {changeIPv4ReverseDNSModal} from "../pages/cloud/server/reverseDNS/ipv4/changeIPv4ReverseDNSModal";
import {changeIPv6ReverseDNSModal} from "../pages/cloud/server/reverseDNS/ipv6/changeIPv6ReverseDNS";
import {editFloatingIpModal} from "../pages/cloud/floatingIPs/editFloatingIp/editFloatingIp";
import {FloatingIPPage} from "../pages/cloud/floatingIPs/floatingIp/floatingIP";
import {assignToServerModal} from "../pages/cloud/floatingIPs/assignToServer/assignToServer";
import {HetznerStatusSettingPage} from "../pages/global/hetzner-status-setting/hetzner-status-setting";
import {OneSignal} from "@ionic-native/onesignal";
import {HetznerStatusPage} from "../pages/global/hetzner-status/hetzner-status";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {ChartsModule} from 'ng2-charts';
import {ServerMetricsPage} from "../pages/cloud/server/server-metrics/server-metrics";
import {AppVersion} from "@ionic-native/app-version";
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HetznerCloudApiProviderModule} from "../modules/hetzner-cloud-api/hetzner-cloud-api-provider.module";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {NgxQRCodeModule} from "@lkdevelopment/ngx-qrcode/dist";
import {HetznerAppComponentsModule} from "../components/hetzner-app-components.module";
import {consoleModal} from "../pages/cloud/server/console/console";
import {Keyboard} from "@ionic-native/keyboard";
import {AppRate} from "@ionic-native/app-rate";
import {createTranslateLoader} from "../providers/translation/loader";
import {NetworkProvider} from '../modules/hetzner-app/network/network';
import {HetznerCloudDataModule} from "../modules/hetzner-cloud-data/hetzner-cloud-data.module";
import {HetznerAppModule} from "../modules/hetzner-app/hetzner-app.module";
import {GlobalAppPagesModule} from "../pages/global/global-app-pages.module";
import {Device} from "@ionic-native/device";
import {CloudAppPagesModule} from "../pages/cloud/cloud-app-pages.module";
import {RobotAppPagesModule} from "../pages/robot/robot-app-pages.module";

/**
 * Init the Ionic Pro Monitoring Service
 * @type {Pro}
 */
const IonicPro = Pro.init('359b3ec5', {
  appVersion: "1.7.0"
});

/**
 * This is the Ionic Pro Error Handler, that sends all errors to ionic pro
 */
@Injectable()
export class IonicProErrorHandler implements ErrorHandler {
  /**
   * The ionic error handler
   */
  ionicErrorHandler: IonicErrorHandler;

  /**
   * Constructor
   * @param {Injector} injector
   * @param {NetworkProvider} network
   */
  constructor(protected injector: Injector, protected network: NetworkProvider) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch (e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  /**
   * How to handle the error
   * @param err
   */
  handleError(err: any): void {
    if (this.network.has_connection == true) {
      IonicPro.monitoring.handleNewError(err);
    }
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
    console.log(err);
  }
}

/**
 * This is the basic module that contains all functions from the app
 */
@NgModule({
  declarations: [
    HetznerMobileApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(HetznerMobileApp),
    HetznerAppModule,
    IonicStorageModule.forRoot(),
    HetznerCloudDataModule,
    HttpClientModule,
    PipesModule,
    BrowserAnimationsModule,
    TooltipsModule,
    ChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HetznerCloudApiProviderModule,
    NgxQRCodeModule,
    BrowserAnimationsModule,
    HetznerAppComponentsModule,
    GlobalAppPagesModule,
    CloudAppPagesModule,
    RobotAppPagesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HetznerMobileApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicProErrorHandler},
    OneSignal,
    InAppBrowser,
    AppVersion,
    FingerprintAIO,
    BarcodeScanner,
    Keyboard,
    AppRate,
    Device
  ]
})
export class AppModule {
}

