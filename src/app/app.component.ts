import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {ProjectsService} from "../models/project/ProjectsService";
import {HomePage} from "../pages/home/home";
import {ProjectsPage} from "../pages/projects/projects";
import {AboutPage} from "../pages/about/about";
import {ServersPage} from "../pages/server/serverList/servers";
import {Storage} from "@ionic/storage";
import {FloatingIPsPage} from "../pages/floatingIPs/floatingIPs";
import {ImagesPage} from "../pages/images/images";
import {ServersService} from "../models/servers/ServersService";
import {OneSignal} from "@ionic-native/onesignal";
import {HetznerStatusPage} from "../pages/hetzner-status/hetzner-status";
import {SettingsPage} from "../pages/settings/settings";
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";
import {TranslateService} from "@ngx-translate/core";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public projects: ProjectsService, storage: Storage, public servers: ServersService, oneSignal: OneSignal, fingerPrint: FingerprintAIO, translate: TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      translate.setDefaultLang('de');
      translate.use('de');
      storage.ready().then(() => {
        statusBar.styleDefault();
        oneSignal.startInit('e8714cee-7480-45da-bad0-19ba3c3e89c4', '1069973161280');

        oneSignal.endInit();
        projects.loadProjects();
        this.servers.loadServers();
        storage.get('lang').then(lang => {
          console.log(lang);
          if (lang != undefined && lang != null && lang.length != 2 ) {
            translate.use(lang);
          }
        });
        fingerPrint.isAvailable().then(res => {
          storage.get('auth').then(val => {
            if (val != undefined && val == 'enabled') {
              fingerPrint.show({
                clientId: 'Hetzner-Cloud-Mobile',
                clientSecret: 'password', //Only necessary for Android
                disableBackup: false,  //Only for Android(optional)
                localizedFallbackTitle: 'Pin benutzen', //Only for iOS
                localizedReason: 'Bitte authentifizieren Sie sich.' //Only for iOS
              }).then(result => {
                splashScreen.hide();
              }).catch(err => {
                alert('Authentifizierung fehlgeschlagen. App wird beendet');
                platform.exitApp();
              });
            } else {
              splashScreen.hide()
            }
          });
        }, () => {
          splashScreen.hide()
        });

      });

    });
  }

  openHomePage() {
    this.nav.setRoot(HomePage);
  }

  openProjectsPage() {
    this.nav.setRoot(ProjectsPage);
  }

  openAboutPage() {
    this.nav.setRoot(AboutPage);
  }

  openServersPage() {
    this.nav.setRoot(ServersPage);
  }

  openFloatingIPsPage() {
    this.nav.setRoot(FloatingIPsPage);
  }

  openImagesPage() {
    this.nav.setRoot(ImagesPage);
  }

  openHetznerStatusPage() {
    this.nav.setRoot(HetznerStatusPage);
  }

  openSettingsPage() {
    this.nav.setRoot(SettingsPage);
  }
}
