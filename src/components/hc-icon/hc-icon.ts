import {Component, Input} from '@angular/core';
import {SVGCacheService} from "ng-inline-svg";
import {Platform} from "ionic-angular";
import {File} from "@ionic-native/file";

/**
 * Generated class for the HcIconComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'hc-icon',
  templateUrl: 'hc-icon.html'
})
export class HcIconComponent {

  @Input() icon;
  @Input() class?: string;

  constructor(svgService: SVGCacheService, protected platform: Platform, protected file: File) {
    if (platform.is('ios')) {
      svgService.setBaseUrl({baseUrl: 'file://' + file.applicationDirectory + 'www/assets/icon/hcloud.svg'});
    } else if (platform.is('android')) {
      svgService.setBaseUrl({baseUrl: '/android_asset/www/assets/icon/hcloud.svg'});
    } else {
      svgService.setBaseUrl({baseUrl: 'assets/icon/hcloud.svg'});
    }
  }

}
