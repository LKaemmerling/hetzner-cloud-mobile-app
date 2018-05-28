import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {HetznerMobileApp} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {IonicStorageModule} from '@ionic/storage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TooltipsModule} from 'ionic-tooltips';
import {OneSignal} from '@ionic-native/onesignal';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {ChartsModule} from 'ng2-charts';
import {AppVersion} from '@ionic-native/app-version';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HetznerCloudApiProviderModule} from '../modules/hetzner-cloud-api/hetzner-cloud-api-provider.module';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {NgxQRCodeModule} from '@lkdevelopment/ngx-qrcode/dist';
import {HetznerAppComponentsModule} from '../components/hetzner-app-components.module';
import {Keyboard} from '@ionic-native/keyboard';
import {createTranslateLoader} from '../providers/translation/loader';
import {HetznerCloudDataModule} from '../modules/hetzner-cloud-data/hetzner-cloud-data.module';
import {HetznerAppModule} from '../modules/hetzner-app/hetzner-app.module';
import {GlobalAppPagesModule} from '../pages/global/global-app-pages.module';
import {Device} from '@ionic-native/device';
import {CloudAppPagesModule} from '../pages/cloud/cloud-app-pages.module';
import {RobotAppPagesModule} from '../pages/robot/robot-app-pages.module';
import {HetznerRobotDataModule} from '../modules/hetzner-robot-data/hetzner-robot-data.module';
import {HetznerRobotApiModule} from '../modules/hetzner-robot-api/hetzner-robot-api.module';
import {HTTP} from "@ionic-native/http";
import {Clipboard} from "@ionic-native/clipboard";
import * as Sentry from 'sentry-cordova';
Sentry.init({ dsn: 'https://601cad5b9564447f8a21148d70ff495d@sentry.io/1214677' });
/**
 * This is the Ionic Pro Error Handler, that sends all errors to ionic pro
 */
export class SentryIonicErrorHandler extends IonicErrorHandler {
  handleError(error) {
    super.handleError(error);
    try {
      Sentry.captureException(error.originalError || error);
    } catch (e) {
      console.error(e);
    }
  }
}

/**
 * This is the basic module that contains all functions from the app
 */
@NgModule({
  declarations: [HetznerMobileApp],
  imports: [
    BrowserModule,
    IonicModule.forRoot(HetznerMobileApp),
    HetznerAppModule,
    IonicStorageModule.forRoot(),
    HetznerCloudDataModule,
    HetznerRobotDataModule,
    HetznerCloudApiProviderModule,
    HetznerRobotApiModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TooltipsModule,
    ChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    NgxQRCodeModule,
    BrowserAnimationsModule,
    HetznerAppComponentsModule,
    GlobalAppPagesModule,
    CloudAppPagesModule,
    RobotAppPagesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [HetznerMobileApp],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: SentryIonicErrorHandler},
    OneSignal,
    InAppBrowser,
    AppVersion,
    FingerprintAIO,
    BarcodeScanner,
    Keyboard,
    Device,
    HTTP,
    Clipboard
  ],
})
export class AppModule {
}
