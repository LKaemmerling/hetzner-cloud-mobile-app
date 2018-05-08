import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AboutPage} from './about/about';
import {DeveloperPage} from './developer/developer';
import {TranslateModule} from '@ngx-translate/core';
import {ChangelogPage} from './changelog/changelog';
import {SettingsPage} from './settings/settings';
import {HomePage} from './home/home';
import {HetznerAppModule} from '../../modules/hetzner-app/hetzner-app.module';
import {IonicStorageModule} from '@ionic/storage';
import {DeleteAllDataPage} from './delete-all-data/delete-all-data';
import {Device} from '@ionic-native/device';
import {CloudAppPagesModule} from '../cloud/cloud-app-pages.module';
import {HetznerStatusPage} from './hetzner-status/hetzner-status';
import {HetznerStatusSettingPage} from './hetzner-status-setting/hetzner-status-setting';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {OneSignal} from '@ionic-native/onesignal';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio';
import {HetznerAppComponentsModule} from '../../components/hetzner-app-components.module';
import {TooltipsModule} from "ionic-tooltips";

@NgModule({
  declarations: [
    AboutPage,
    DeveloperPage,
    ChangelogPage,
    SettingsPage,
    HomePage,
    DeleteAllDataPage,
    HetznerStatusPage,
    HetznerStatusSettingPage,
  ],
  imports: [
    IonicPageModule,
    TranslateModule,
    HetznerAppModule,
    IonicStorageModule,
    CloudAppPagesModule,
    HetznerAppComponentsModule,
    TooltipsModule
  ],
  entryComponents: [
    AboutPage,
    DeveloperPage,
    ChangelogPage,
    SettingsPage,
    HomePage,
    DeleteAllDataPage,
    HetznerStatusPage,
    HetznerStatusSettingPage,
  ],
  providers: [Device, InAppBrowser, OneSignal, FingerprintAIO],
})
export class GlobalAppPagesModule {
}
