import {Component, Input} from '@angular/core';

/**
 * Generated class for the NumericStepIndicatorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'numeric-step-indicator',
  templateUrl: 'numeric-step-indicator.html'
})
export class NumericStepIndicatorComponent {
  /**
   * The step number
   */
  @Input() step: number;
  /**
   * The language key that ident the step
   */
  @Input() lang_key: string;



}
