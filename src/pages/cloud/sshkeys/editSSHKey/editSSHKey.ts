import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {SshKeyApiProvider} from '../../../../modules/hetzner-cloud-api/ssh-key-api/ssh-key-api';
import {TrackingService} from "../../../../modules/hetzner-app/tracking/tracking.service";

/**
 * This modal makes it possible to edit a ssh key
 */
@Component({
  selector: 'modal-editSSHKey',
  templateUrl: 'editSSHKey.html',
})
export class editSSHKeyModal {
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
  constructor(
    protected viewCtrl: ViewController,
    protected sshKeyApi: SshKeyApiProvider,
    protected navParams: NavParams,
    protected navCtrl: NavController,
    protected loadingCtrl: LoadingController,
    protected tracking: TrackingService
  ) {
    this.ssh_key = navParams.get('ssh_key');
    this.tracking.trackFeature('cloud.ssh_keys.edit');
  }

  /**
   * Rename the current ssh key
   */
  public updateSshKey() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.sshKeyApi.changeName(this.ssh_key.id, this.ssh_key.name).then(() => {
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
