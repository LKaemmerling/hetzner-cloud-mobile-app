import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {SshKeysApiProvider} from "../../../../modules/hetzner-robot-api/ssh-key-api/ssh-keys-api";

/**
 * This modal makes it possible to edit a ssh key
 */
@Component({
  selector: 'modal-ssh-key-edit',
  templateUrl: 'ssh-key-edit.html'
})
export class SshKeyEditModal {
  /**
   * The ssh key that should be edited
   */
  public ssh_key: any;

  /**
   * Constructor
   * @param {ViewController} viewCtrl
   * @param {SshKeyApiProvider} sshKeyApi
   * @param {NavParams} navParams
   * @param {NavController} navCtrl
   * @param {LoadingController} loadingCtrl
   */
  constructor(protected viewCtrl: ViewController,
              protected sshKeyApi: SshKeysApiProvider,
              protected navParams: NavParams,
              protected navCtrl: NavController,
              protected loadingCtrl: LoadingController) {
    this.ssh_key = navParams.get('ssh_key');
  }

  /**
   * Rename the current ssh key
   */
  public updateSshKey() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.sshKeyApi.update(this.ssh_key.fingerprint, this.ssh_key.name).then(() => {
      loader.dismiss();
      this.dismiss();
    });

  }

  /**
   * Dismiss the modal
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
