import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {NetworkProvider} from "../../modules/hetzner-app/network/network";
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the LoadingIndicatorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'loading-indicator',
  templateUrl: 'loading-indicator.html'
})
/**
 *
 */
export class LoadingIndicatorComponent {
  /**
   * @type {string}
   */
  @Input() loading: boolean;
  /**
   * @type {string}
   */
  @Input() loading_done: boolean;
  /**
   * @type {string}
   */
  @Input() loading_error?: boolean;
  /**
   * @type {string}
   */
  @Input() error_message?: string;
  /**
   *
   * @type {EventEmitter<string>}
   */
  @Output() action = new EventEmitter<string>();
  /**
   *
   * @type {boolean}
   */
  public network_available: boolean = false;

  /**
   *
   * @param {NetworkProvider} network
   * @param {TranslateService} translate
   */
  constructor(public network: NetworkProvider, public translate: TranslateService) {
    this.network_available = this.network.has_connection;
  }

  /**
   *
   */
  callAction() {
    this.action.next('clicked');
  }

  /**
   *
   */
  displayNetworkInfo() {
    this.translate.get('GLOBAL.FEATURE_NEEDS_CONNECTION').subscribe((text) => {
      alert(text);
    })
  }

}
