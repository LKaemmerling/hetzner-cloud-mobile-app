import { Component, Input } from '@angular/core';

/**
 * Generated class for the SelectDatacenterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'select-only-one-box',
    templateUrl: 'select-only-one-box.html',
})
export class SelectOnlyOneBoxComponent {
    @Input() items: Array<any>;
    selectedParent: string;
    selectedChildren: string = null;

    //@Output('?__selection') __selection = null;

    selectItem(parent, child = null) {
        this.selectedParent = parent;
        this.selectedChildren = child;
        // this.__selection = {parent: this.selectedParent, children: this.selectedChildren};
    }
}
