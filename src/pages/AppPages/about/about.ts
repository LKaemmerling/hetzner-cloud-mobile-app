import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ChangelogPage} from "../changelog/changelog";

/**
 * This is the basic about page, that contains some information about the author of the app and the app
 */
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  /**
   * Changelog
   * @param {NavController} nav
   */
  constructor(protected nav: NavController) {
  }

  /**
   * Open the Changelog Page
   */
  openChangelogPage() {
    this.nav.push(ChangelogPage);
  }
}
