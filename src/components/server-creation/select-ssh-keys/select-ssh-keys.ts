import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SshKeysService} from "../../../modules/hetzner-cloud-data/ssh-keys/ssh-keys.service";

/**
 * Generated class for the SelectDatacenterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'select-ssh-keys',
  templateUrl: 'select-ssh-keys.html'
})
export class SelectSshKeyComponent {
  @Input() selectedSshKeys: Array<any> = [];
  @Output() selectedSshKeysChange = new EventEmitter<Array<any>>();
  selectedParent: Array<any> = [];
  ssh_keys: Array<any> = [];

  constructor(sshKeysService: SshKeysService) {
    this.ssh_keys = sshKeysService.ssh_keys;
  }

  //@Output('?__selection') __selection = null;

  selectItem(parent) {
    if (this.selectedParent.indexOf(parent.id) != -1) {
      delete this.selectedParent[this.selectedParent.indexOf(parent.id)];
    } else {
      this.selectedParent.push(parent.id);
    }
    this.selectedSshKeysChange.emit(this.selectedParent);
  }
}
