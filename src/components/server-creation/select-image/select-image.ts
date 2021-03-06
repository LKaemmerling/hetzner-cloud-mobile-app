import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImagesService} from '../../../modules/hetzner-cloud-data/images/images.service';

/**
 * Generated class for the SelectDatacenterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'select-image',
  templateUrl: 'select-image.html',
})
export class SelectImageComponent {
  @Input() selectedImage: number;
  @Input() selectedSnapshot: any = null;
  @Output() selectedImageChange = new EventEmitter<number>();

  type: string = 'system';
  images: Array<any> = [];
  snapshots: Array<any> = [];
  backups: Array<any> = [];
  selectedParent: string;
  selectedChildren: string = null;

  //@Output('?__selection') __selection = null;
  constructor(protected imagesService: ImagesService) {
  }

  ngOnInit() {
    this.imagesService.getImagesByType('system').forEach(image => {
      var found = false;
      this.images.forEach(i => {
        if (i.label == image.os_flavor) {
          i.options.push({id: image.id, label: image.name.replace(image.os_flavor + '-', ''),});
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
              label: image.name.replace(image.os_flavor + '-', ''),
            },
          ],
        });
      }
    });
    this.imagesService.getImagesByType('snapshot').forEach(image => {
      this.snapshots.push({
        id: image.id,
        label: image.description,
      });
    });
    this.imagesService.getImagesByType('backups').forEach(image => {
      this.snapshots.push({
        id: image.id,
        label: image.description,
      });
    });
    if (this.selectedSnapshot != null) {
      this.type = this.selectedSnapshot.type;
      console.log(this.selectedSnapshot);
      this.selectItem(this.selectedSnapshot, this.selectedSnapshot);
    }
  }

  selectItem(parent, child = null) {
    this.selectedParent = parent.id;
    if (child == null) {
      child = parent.options[0];
    }
    this.selectedChildren = child.id;
    this.selectedImageChange.emit(child == null ? parent.id : child.id);
    // this.__selection = {parent: this.selectedParent, children: this.selectedChildren};
  }
}
