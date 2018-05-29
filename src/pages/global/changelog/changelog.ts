import {Component} from '@angular/core';
import {ConfigService} from '../../../modules/hetzner-app/config/config.service';
import {Platform, ViewController} from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {Storage} from '@ionic/storage';
import {TrackingService} from "../../../modules/hetzner-app/tracking/tracking.service";

/**
 * This is the basic about page, that contains some information about the author of the app and the app
 */
@Component({
  selector: 'page-changelog',
  templateUrl: 'changelog.html',
})
export class ChangelogPage {
  constructor(
    protected config: ConfigService,
    protected platform: Platform,
    private domsanitizer: DomSanitizer,
    protected storage: Storage,
    protected viewCtrl: ViewController,
    protected tracking: TrackingService
  ) {
    this.storage.set('changelog_' + this.config.version.slice(0, -2), 'true');
    tracking.trackFeature('global.changelog');
  }

  getStyleForSlide(slide) {
    return this.domsanitizer.bypassSecurityTrustStyle(
      'background-image: url("assets/changelog/' +
      this.config.language +
      '/' +
      (this.platform.is('android') ? 'android' : 'ios') +
      '/' +
      slide +
      '.png");'
    );
  }

  /**
   * Dismiss the modal
   */
  dismiss() {
    return this.viewCtrl.dismiss();
  }
}
