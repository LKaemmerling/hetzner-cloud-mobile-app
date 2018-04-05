import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Generated class for the SelectBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'clickable-select-box',
  templateUrl: 'select-box.html'
})
export class SelectBoxComponent {

  /**
   * What should be done if someone click on the reload button
   * @type {EventEmitter<number>}
   */
  @Output() selected_item = new EventEmitter<string>();

  @Input() selected: boolean;
  @Input() item_id: string;

  selectThisBox() {
    this.selected_item.next(this.item_id);
    console.log(this.item_id);
  }
}
