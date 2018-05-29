import {Component} from '@angular/core';
import {LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {fadeIn, fadeOut} from 'ng-animate';
import {StorageBoxApiProvider} from "../../../../modules/hetzner-robot-api/storage-box-api/storage-box-api";
import {StorageBoxEditModal} from "../edit/storage-box-edit";
import {StorageBoxSubAccountsListPage} from "./sub-accounts/list/sub-accounts-list";
import {StorageBoxSnapshotsListPage} from "./snapshots/list/snapshots-list";
import {TrackingService} from "../../../../modules/hetzner-app/tracking/tracking.service";

/**
 * This is the project page, where you can create, activate, share and delete projects
 */
@Component({
  selector: 'page-storage-box-details',
  templateUrl: 'storage-box-details.html',
})
export class StorageBoxDetailPage {
  /**
   * All available servers
   * @type {any[]}
   */
  public storagebox: any;

  /**
   * Is the component in the loading process?
   * @type {boolean}
   */
  public loader: any;

  /**
   * Contstructor
   * @param {NavParams} NavParams
   * @param {StorageBoxApiProvider} storageBoxApi
   * @param {LoadingController} loadingCtrl
   */
  constructor(
    protected NavParams: NavParams,
    protected storageBoxApi: StorageBoxApiProvider,
    protected loadingCtrl: LoadingController,
    protected modalCtrl: ModalController,
    protected navCtrl: NavController,
    protected tracking: TrackingService
  ) {
    this.storagebox = this.NavParams.get('storage_box');
    tracking.trackFeature('robot.storage_box.details');
  }

  loadStorageBox() {


    let loader = this.loadingCtrl.create();
    loader.present();
    this.storageBoxApi.getStorageBox(this.storagebox.id).then(val => {
      this.navCtrl.push(StorageBoxDetailPage, {storage_box: val['storagebox']});
      loader.dismiss();
    });
  }

  /**
   *
   */
  openEditModal() {
    let modal = this.modalCtrl.create(StorageBoxEditModal, {storage_box: this.storagebox});
    modal.onDidDismiss(() => {
      this.loadStorageBox();
    });
    modal.present();
  }

  openSubAccountsPage() {
    this.navCtrl.push(StorageBoxSubAccountsListPage, {storage_box: this.storagebox});
  }

  openSnapshotsPage() {
    this.navCtrl.push(StorageBoxSnapshotsListPage, {storage_box: this.storagebox});
  }
}
