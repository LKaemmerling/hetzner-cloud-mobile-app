import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams, ViewController } from 'ionic-angular';
import { ServerApiProvider } from '../../../../modules/hetzner-robot-api/server-api/server-api.provider';
import {StorageBoxApiProvider} from "../../../../modules/hetzner-robot-api/storage-box-api/storage-box-api";

/**
 * This modal makes it possible to edit a ssh key
 */
@Component({
    selector: 'modal-storage-box-edit',
    templateUrl: 'storage-box-edit.html',
})
export class StorageBoxEditModal {
    /**
     * The ssh key that should be edited
     */
    public storage_box: any;

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
        protected loadingCtrl: LoadingController
    ) {
        this.storage_box = navParams.get('storage_box');
    }

    /**
     * Rename the current ssh key
     */
    public updateStorageBox() {
        let loader = this.loadingCtrl.create();
        loader.present();
        this.storageBoxApi.update(this.storage_box.id, this.storage_box.name).then(() => {
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
