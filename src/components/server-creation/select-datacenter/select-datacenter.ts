import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LocationApiProvider} from "../../../providers/location-api/location-api";

/**
 * Generated class for the SelectDatacenterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'select-datacenter',
  templateUrl: 'select-datacenter.html'
})
export class SelectDatacenterComponent {
  @Input() selectedDatacenter: number;
  @Output() selectedDatacenterChange = new EventEmitter<number>();
  selectedParent: number;
  selectedChildren: number = null;
  datacenters: Array<any> = [];

  constructor(locationApi: LocationApiProvider) {
    locationApi.getDataCenters().then(response => {
      response['datacenters'].forEach((dc) => {
        var found = false;
        this.datacenters.forEach((sdc) => {
          if (sdc.id == dc.location.id) {
            sdc.options.push({id: dc['location'].id, label: dc.name, server_types: dc.server_types});
            found = true;
          }
        });
        if (found == false) {
          // if (dc['server_types'].available.length > 0) {
          this.datacenters.push({
            id: dc['location'].id,
            label: dc['location'].city,
            icon: 'flag-icon flag-icon-' + dc['location'].country.toLowerCase(),
            server_types: dc['server_types'],
            options: [
              {
                id: dc.id,
                label: dc.name.replace(dc['location'].name + '-', ''),
                server_types: dc.server_types
              }
            ]
          });
          // }
        }
      });
    })
  }

  //@Output('?__selection') __selection = null;

  selectItem(parent, child = null) {
    if (parent.server_types.available.length > 0) {
      if(child == null){
        child = parent.options[0];
      }
      this.selectedParent = parent.id;
      this.selectedChildren = child.id;
      this.selectedDatacenterChange.emit((child == null) ? parent.id : child.id);
    }
    // this.__selection = {parent: this.selectedParent, children: this.selectedChildren};
  }
}
