import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServerTypesService } from '../../../modules/hetzner-cloud-data/server-types/server-types.service';
import { ServerType } from '../../../modules/hetzner-cloud-data/servers/server';

/**
 * Generated class for the SelectDatacenterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'select-type',
    templateUrl: 'select-type.html',
})
export class SelectTypeComponent {
    @Input() selectedType: any;
    @Input() currentType?: any;
    @Output() selectedTypeChange = new EventEmitter<ServerType>();
    server_types_local: Array<any> = [];
    server_types_ceph: Array<any> = [];
    selectedParent: number;
    type: string = 'local';

    //@Output('?__selection') __selection = null;
    constructor(typeService: ServerTypesService) {
        this.selectedParent = this.currentType != null ? this.currentType.id : null;
        console.log(this.currentType);
        typeService.server_types.forEach(server_type => {
            if (server_type.storage_type == 'network') {
                this.server_types_ceph.push(server_type);
            } else {
                this.server_types_local.push(server_type);
            }
        });
    }

    selectItem(parent) {
        this.selectedParent = parent.id;
        this.selectedTypeChange.emit(parent);
        // this.__selection = {parent: this.selectedParent, children: this.selectedChildren};
    }
}
