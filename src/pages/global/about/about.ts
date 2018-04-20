import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
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
  constructor(protected modal: ModalController) {
  }

  /**
   * Open the Changelog Page
   */
  openChangelogPage() {
    this.modal.create(ChangelogPage).present();
  }
}
