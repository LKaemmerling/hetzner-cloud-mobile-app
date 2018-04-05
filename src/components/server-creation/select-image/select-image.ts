import {Component} from '@angular/core';
import {ImagesService} from "../../../modules/hetzner-cloud-data/images/images.service";

/**
 * Generated class for the SelectDatacenterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'select-image',
  templateUrl: 'select-image.html'
})
export class SelectImageComponent {

  images: Array<any> = [];
  selectedParent: string;
  selectedChildren: string = null;

  //@Output('?__selection') __selection = null;
  constructor(imagesService: ImagesService) {
    imagesService.getImagesByType('system').forEach((image) => {
      var found = false;
      this.images.forEach((i) => {
        if (i.label == image.os_flavor) {
          i.options.push({id: image.id, label: image.name});
          found = true;
        }
      });
      if (found == false) {
        this.images.push({
          id: image.id,
          label: image.os_flavor,
          icon: 'flag-icon os-icon flag-icon-squared os-icon-' + image.os_flavor.toLowerCase(),
          options: [
            {
              id: image.id,
              label: image.os_version.replace(image.os_flavor + '-', '')
            }
          ]
        });
      }
    })
  }

  selectItem(parent, child = null) {
    this.selectedParent = parent;
    this.selectedChildren = child;
    // this.__selection = {parent: this.selectedParent, children: this.selectedChildren};
  }
}
