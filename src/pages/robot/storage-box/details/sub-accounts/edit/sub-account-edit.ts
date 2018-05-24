import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {StorageBoxApiProvider} from "../../../../../../modules/hetzner-robot-api/storage-box-api/storage-box-api";
import {ConfigService} from "../../../../../../modules/hetzner-app/config/config.service";
import {ErrorPage} from "../../../../../global/error/error";

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
    protected config: ConfigService
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
    }, (message) => {
      if (this.config.getRemoteFeatureFlag('RESPONSE_DEBUG', false)) {
        this.navCtrl.push(ErrorPage, {error: message});
      }
      if (message.message != undefined && message.message.error != undefined) {
        if (message.message.error.invalid[0] == 'homedirectory') {
          this.error = true;
        }
      }
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
