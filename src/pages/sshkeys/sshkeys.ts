import {Component} from '@angular/core';
import {ActionSheetController, ModalController, NavController, NavParams} from 'ionic-angular';
import {SshKeyApiProvider} from "../../providers/ssh-key-api/ssh-key-api";
import {editSSHKeyModal} from "./editSSHKey/editSSHKey";
import {SshKeysService} from "../../modules/hetzner-cloud-data/ssh-keys/ssh-keys.service";

/**
 * Generated class for the SshkeysPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sshkeys',
  templateUrl: 'sshkeys.html',
})
export class SshkeysPage {
  public _ssh_keys;
  public loading: boolean = false;
  public loading_done: boolean = false;

  constructor(protected navCtrl: NavController,
              protected navParams: NavParams,
              protected sshKeysService: SshKeysService,
              protected actionSheetCtrl: ActionSheetController,
              protected modalCtrl: ModalController,
              protected sshKeyProvider: SshKeyApiProvider) {
    this._ssh_keys = this.sshKeysService.ssh_keys;
  }

  loadSSHKeys() {
    this.loading = true;
    this.sshKeysService.reloadSshKeys().then(() => {
      this._ssh_keys = this.sshKeysService.ssh_keys;
      this.loading = false;
      this.loading_done = true;
      setTimeout(() => this.loading_done = false, 3000);
    });
  }

  public ionViewWillEnter() {
    this.loadSSHKeys();
  }

  public delete(ssh_key) {
    if (confirm('Möchten Sie diesen SSH-Key wirklich unwiderruflich löschen?')) {
      this.sshKeyProvider.delete(ssh_key.id).then((data) => {
        this.loadSSHKeys();
      });
    }
  }

  public openActionSheets(ssh_key) {
    /** @TODO **/
    var actions = {
      title: 'Aktionen für den SSH Key ' + ssh_key.name,
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Löschen',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.delete(ssh_key);
          }
        },
        {
          text: 'Edit',
          icon: 'brush',
          handler: () => {
            this.modalCtrl.create(editSSHKeyModal, {ssh_key: ssh_key}).present();
          }
        },
        {
          text: 'Abbrechen',
          role: 'cancel', // will always sort to be on the bottom
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }
    let actionSheet = this.actionSheetCtrl.create(actions);
    actionSheet.present();
  }
}
