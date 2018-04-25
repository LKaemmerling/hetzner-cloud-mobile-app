import {Component} from '@angular/core';
import {LoadingController, ModalController, NavParams} from 'ionic-angular';
import {fadeIn, fadeOut} from 'ng-animate';
import {StorageBoxApiProvider} from "../../../../modules/hetzner-robot-api/storage-box-api/storage-box-api.class";
import {StorageBoxEditModal} from "../edit/storage-box-edit";

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
    protected modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
    this.loadStorageBox();
  }

  loadStorageBox() {
    this.loader = this.loadingCtrl.create();
    this.loader.present();
    this.storageBoxApi.getStorageBox(this.NavParams.get('storage_box_id')).then(val => {
      this.storagebox = val['storagebox'];
      this.loader.dismiss();
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
}
