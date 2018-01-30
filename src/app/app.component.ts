import {Component, ViewChild} from '@angular/core';
import {Nav, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {ProjectsService} from "../models/project/ProjectsService";
import {HomePage} from "../pages/home/home";
import {ProjectsPage} from "../pages/projects/projects";
import {AboutPage} from "../pages/about/about";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public projects: ProjectsService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      projects.loadProjects();
    });
  }

  openProjectsPage() {
    this.nav.setRoot(ProjectsPage);
  }
  openAboutPage() {
    this.nav.setRoot(AboutPage);
  }
}
