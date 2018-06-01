import {Component, Input} from '@angular/core';
import {SVGCacheService} from "ng-inline-svg";

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

  constructor(svgService: SVGCacheService) {
    svgService.setBaseUrl({baseUrl: '/assets/icon/hcloud.svg'});
  }

}
