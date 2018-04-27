import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {StorageBoxApiProvider} from "../../../../../../modules/hetzner-robot-api/storage-box-api/storage-box-api";

/**
 * This modal makes it possible to edit a ssh key
 */
@Component({
  selector: 'modal-sub-account-edit',
  templateUrl: 'sub-account-edit.html',
})
export class StorageBoxSubAccountEditModal {
  /**
   * The ssh key that should be edited
   */
  public storage_box: any;

  public sub_account: any;

  protected error: boolean = false;

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
  ) {
    this.storage_box = navParams.get('storage_box');
    this.sub_account = navParams.get('sub_account');
  }

  /**
   * Rename the current ssh key
   */
  public updateSubAccount() {
    this.error = false;
    let loader = this.loadingCtrl.create();
    loader.present();
    this.storageBoxApi.editSubaccount(this.storage_box.id, this.sub_account.username, this.sub_account.homedirectory, this.sub_account.samba, this.sub_account.webdav, this.sub_account.readonly, this.sub_account.comment).then(() => {
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
