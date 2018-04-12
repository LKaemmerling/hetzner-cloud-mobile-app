import {Component} from '@angular/core';
import {ConfigService} from "../../modules/hetzner-app/config/config.service";
import {Platform} from "ionic-angular";
import {DomSanitizer} from "@angular/platform-browser";
import {Storage} from "@ionic/storage";

/**
 * This is the basic about page, that contains some information about the author of the app and the app
 */
@Component({
  selector: 'page-changelog',
  templateUrl: 'changelog.html'
})
export class ChangelogPage {
  constructor(protected config: ConfigService, protected platform: Platform, private domsanitizer: DomSanitizer, protected storage: Storage) {
    this.storage.set('changelog_' + this.config.version.slice(0, -2), 'true');
  }

  getStyleForSlide(slide) {
    return this.domsanitizer.bypassSecurityTrustStyle('background-image: url("assets/changelog/' + this.config.language + '/' + (this.platform.is('android') ? 'android' : 'ios') + '/' + slide + '.png");');
  }
}
