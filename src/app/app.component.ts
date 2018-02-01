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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public projects: ProjectsService, storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      storage.ready().then(() => {
        statusBar.styleDefault();

        projects.loadProjects();
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
}
