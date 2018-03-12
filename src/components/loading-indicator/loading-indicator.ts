import {Component, EventEmitter, Input, Output} from '@angular/core';

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


  constructor() {
  }

  callAction() {
    this.action.next('clicked');
  }

}
