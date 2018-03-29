import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {NetworkProvider} from "../../models/network/network";

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
export class LoadingIndicatorComponent {

  @Input() loading: boolean;
  @Input() loading_done: boolean;
  @Input() loading_error?: boolean;
  @Input() error_message?: string;
  @Output() action = new EventEmitter<string>()
  public network_available: boolean = false;

  constructor(public network: NetworkProvider) {
    this.network_available = this.network.has_connection;
  }

  callAction() {
    this.action.next('clicked');
  }

}
