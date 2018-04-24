import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../../modules/hetzner-robot-api/server-api/server-api";

/**
 * This modal makes it possible to edit a ssh key
 */
@Component({
  selector: 'modal-server-edit',
  templateUrl: 'server-edit.html'
})
export class ServerEditModal {
  /**
   * The ssh key that should be edited
   */
  public server: any;

  /**
   * Constructor
   * @param {ViewController} viewCtrl
   * @param {ServerApiProvider} serverApi
   * @param {NavParams} navParams
   * @param {NavController} navCtrl
   * @param {LoadingController} loadingCtrl
   */
  constructor(protected viewCtrl: ViewController,
              protected serverApi: ServerApiProvider,
              protected navParams: NavParams,
              protected navCtrl: NavController,
              protected loadingCtrl: LoadingController) {
    this.server = navParams.get('server');
  }

  /**
   * Rename the current ssh key
   */
  public updateServer() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.serverApi.update(this.server.server_ip, this.server.server_name).then(() => {
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
