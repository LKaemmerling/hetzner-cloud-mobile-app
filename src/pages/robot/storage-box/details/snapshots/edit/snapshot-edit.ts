import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {StorageBoxApiProvider} from "../../../../../../modules/hetzner-robot-api/storage-box-api/storage-box-api";

/**
 * This modal makes it possible to edit a ssh key
 */
@Component({
  selector: 'modal-snapshot-edit',
  templateUrl: 'snapshot-edit.html',
})
export class StorageBoxSnapshotEditModal {
  /**
   * The ssh key that should be edited
   */
  public storage_box: any;

  public snapshot: any;

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
    this.snapshot = navParams.get('snapshot');
  }

  /**
   * Rename the current ssh key
   */
  public updateSnapshot() {
    this.error = false;
    let loader = this.loadingCtrl.create();
    loader.present();
    this.storageBoxApi.commentSnapshot(this.storage_box.id, this.snapshot.name,this.snapshot.comment).then(() => {
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
