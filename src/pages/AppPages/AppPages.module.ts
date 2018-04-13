import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AboutPage} from "./about/about";
import {DeveloperPage} from "./developer/developer";
import {TranslateModule} from "@ngx-translate/core";
import {ChangelogPage} from "./changelog/changelog";
import {SettingsPage} from "./settings/settings";
import {HomePage} from "./home/home";
import {HetznerAppModule} from "../../modules/hetzner-app/hetzner-app.module";
import {IonicStorageModule} from "@ionic/storage";
import {PipesModule} from "../../pipes/pipes.module";
import {DeleteAllDataPage} from "./delete-all-data/delete-all-data";
import {Device} from "@ionic-native/device";

@NgModule({
  declarations: [
    AboutPage,
    DeveloperPage,
    ChangelogPage,
    SettingsPage,
    HomePage,
    DeleteAllDataPage
  ],
  imports: [
    IonicPageModule,
    TranslateModule,
    HetznerAppModule,
    IonicStorageModule,
    PipesModule
  ],
  entryComponents: [
    AboutPage,
    DeveloperPage,
    ChangelogPage,
    SettingsPage,
    HomePage,
    DeleteAllDataPage
  ],
  providers: [
    Device
  ]
})
export class AppPagesModule {
}
