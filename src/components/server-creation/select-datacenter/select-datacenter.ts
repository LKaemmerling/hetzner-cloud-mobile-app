import {Component, Input} from '@angular/core';
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

  selectedParent: string;
  selectedChildren: string = null;
  datacenters: Array<any> = [];

  constructor(locationApi: LocationApiProvider) {
    locationApi.getDataCenters().then(response => {
      response['datacenters'].forEach((dc) => {
        var found = false;
        this.datacenters.forEach((sdc) => {
          if (sdc.id == dc.location.id) {
            sdc.options.push({id: dc['location'].id, label: dc.name});
            found = true;
          }
        });
        if (found == false) {
          if (dc['server_types'].available.length > 0) {
            this.datacenters.push({
              id: dc['location'].id,
              label: dc['location'].city,
              icon: 'flag-icon flag-icon-squared flag-icon-' + dc['location'].country.toLowerCase(),
              options: [
                {
                  id: dc.id,
                  label: dc.name.replace(dc['location'].name + '-', '')
                }
              ]
            });
          }
        }
      });
    })
  }

  //@Output('?__selection') __selection = null;

  selectItem(parent, child = null) {
    this.selectedParent = parent;
    this.selectedChildren = child;
    // this.__selection = {parent: this.selectedParent, children: this.selectedChildren};
  }
}
