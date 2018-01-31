import {ErrorHandler, Injectable, Injector, NgModule, Pipe, PipeTransform} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {IonicStorageModule} from '@ionic/storage';
import {ProjectModule} from "../models/project/project.module";
import {ProjectsPage} from "../pages/projects/projects";
import {addProjectModal} from "../pages/projects/addProject/addProject";
import {ServersPage} from "../pages/server/serverList/servers";
// import {HetznerApiProvider}  from "../providers/hetzner-api/hetzner-api";
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
import {ServerApiProvider} from '../providers/server-api/server-api';
import {ServerTypeApiProvider} from '../providers/server-type-api/server-type-api';
import {FloatingIpApiProvider} from '../providers/floating-ip-api/floating-ip-api';
import { LocationApiProvider } from '../providers/location-api/location-api';
import { ImageApiProvider } from '../providers/image-api/image-api';
import { SshKeyApiProvider } from '../providers/ssh-key-api/ssh-key-api';

const IonicPro = Pro.init('359b3ec5', {
  appVersion: "0.0.4"
});

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
  }
}

/*
 * Convert bytes into largest possible unit.
 * Takes an precision argument that defaults to 2.
 * Usage:
 *   bytes | fileSize:precision
 * Example:
 *   {{ 1024 |  fileSize}}
 *   formats to: 1 KB
*/
@Pipe({name: 'fileSize'})
export class FileSizePipe implements PipeTransform {

  private units = [
    'bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB'
  ];

  transform(bytes: number = 0, precision: number = 2): string {
    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) return '?';

    let unit = 0;

    while (bytes >= 1024) {
      bytes /= 1024;
      unit++;
    }

    return bytes.toFixed(+precision) + ' ' + this.units[unit];
  }
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProjectsPage,
    addProjectModal,
    ServersPage,
    ServerPage,
    FileSizePipe,
    addServerModal,
    editServerModal,
    powerSettingsModal,
    rescueModeModal,
    resizeServerModal,
    backupSettingsModal,
    FloatingIPsPage,
    addFloatingIPModal,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ProjectModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProjectsPage,
    addProjectModal,
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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: MyErrorHandler},
    ServerApiProvider,
    ServerTypeApiProvider,
    FloatingIpApiProvider,
    LocationApiProvider,
    ImageApiProvider,
    SshKeyApiProvider
  ]
})
export class AppModule {
}

