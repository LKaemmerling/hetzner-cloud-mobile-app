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
import {HetznerStatusSettingPage} from "../pages/hetzner-status-setting/hetzner-status-setting";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public projects: ProjectsService, storage: Storage, public servers: ServersService, oneSignal: OneSignal) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      storage.ready().then(() => {
        statusBar.styleDefault();
        oneSignal.startInit('e8714cee-7480-45da-bad0-19ba3c3e89c4', '1069973161280')
        oneSignal.endInit();
        projects.loadProjects();
        this.servers.loadServers();
        splashScreen.hide();
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

  openHetznerStatusSetting() {
    this.nav.setRoot(HetznerStatusSettingPage);
  }
}
