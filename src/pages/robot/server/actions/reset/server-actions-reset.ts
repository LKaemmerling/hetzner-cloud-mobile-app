import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {ServerApiProvider} from '../../../../../modules/hetzner-robot-api/server-api/server-api.provider';

/**
 * This modal makes it possible to edit a ssh key
 */
@Component({
  selector: 'modal-server-actions-reset',
  templateUrl: 'server-actions-reset.html',
})
export class ServerActionsResetModal {
  /**
   * The ssh key that should be edited
   */
  public server: any;

  public options: Array<string> = [];

  public option: string;

  public wol: boolean = false;

  /**
   * Constructor
   * @param {ViewController} viewCtrl
   * @param {ServerApiProvider} serverApi
   * @param {NavParams} navParams
   * @param {NavController} navCtrl
   * @param {LoadingController} loadingCtrl
   */
  constructor(
    protected viewCtrl: ViewController,
    protected serverApi: ServerApiProvider,
    protected navParams: NavParams,
    protected navCtrl: NavController,
    protected loadingCtrl: LoadingController
  ) {
    this.server = navParams.get('server');
    this.serverApi.resetOptions(this.server.server_ip).then((resp) => {
      this.options = resp['reset'].type;
    });
    this.serverApi.wolOptions(this.server.server_ip).then(resp => {
      this.wol = true;
    }, null)
  }

  /**
   * Rename the current ssh key
   */
  public sendReset() {
    let loader = this.loadingCtrl.create();
    loader.present();
    if (this.option == "wol") {
      this.serverApi.wol(this.server.server_ip).then(() => {
        loader.dismiss();
        this.dismiss();
      });
    } else {
      this.serverApi.reset(this.server.server_ip, this.option).then(() => {
        loader.dismiss();
        this.dismiss();
      });
    }

  }

  /**
   * Dismiss the modal
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
