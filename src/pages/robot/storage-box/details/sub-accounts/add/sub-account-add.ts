import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {StorageBoxApiProvider} from "../../../../../../modules/hetzner-robot-api/storage-box-api/storage-box-api";
import {TrackingService} from "../../../../../../modules/hetzner-app/tracking/tracking.service";

/**
 * This modal makes it possible to edit a ssh key
 */
@Component({
  selector: 'modal-sub-account-add',
  templateUrl: 'sub-account-add.html',
})
export class StorageBoxSubAccountAddModal {
  /**
   * The ssh key that should be edited
   */
  public storage_box: any;

  protected comment: string = '';
  protected samba: boolean = false;
  protected webdav: boolean = false;
  protected readonly: boolean = false;
  protected homedirectory: string = '';

  protected error: boolean =false;

  /**
   * Constructor
   * @param {ViewController} viewCtrl
   * @param {StorageBoxApiProvider} storageBoxApi
   * @param {NavParams} navParams
   * @param {NavController} navCtrl
   * @param {LoadingController} loadingCtrl
   */
  constructor(
    protected viewCtrl: ViewController,
    protected storageBoxApi: StorageBoxApiProvider,
    protected navParams: NavParams,
    protected navCtrl: NavController,
    protected loadingCtrl: LoadingController,
    protected tracking:TrackingService
  ) {
    this.storage_box = navParams.get('storage_box');
    tracking.trackFeature('robot.storage_box.sub_accounts.add');
  }

  /**
   * Rename the current ssh key
   */
  public createSubAccount() {
    this.error = false;
    let loader = this.loadingCtrl.create();
    loader.present();
    this.storageBoxApi.createSubaccount(this.storage_box.id, this.homedirectory, this.samba, this.webdav, this.readonly, this.comment).then(() => {
      loader.dismiss();
      this.dismiss();
    }, () => {
        this.error = true;
        loader.dismiss();
    });
  }

  /**
   * Dismiss the modal
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
