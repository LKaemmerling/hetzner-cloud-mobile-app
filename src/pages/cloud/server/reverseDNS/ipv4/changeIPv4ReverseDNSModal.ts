import {Component} from '@angular/core';
import {LoadingController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../../../modules/hetzner-cloud-api/server-api/server-api";
import {Server} from "../../../../../modules/hetzner-cloud-data/servers/server";

/**
 * With this modal you can change the ipv4 reverse dns settings of a server/ip
 */
@Component({
  selector: 'modal-changeIPv4ReverseDNS',
  templateUrl: 'changeIPv4ReverseDNS.html'
})
export class changeIPv4ReverseDNSModal {
  /**
   * The selected server
   */
  public server: Server;
  /**
   * The servername and the ip
   */
  public param: any;

  /**
   * Constructor
   * @param {ViewController} viewCtrl
   * @param {LoadingController} loadingCtrl
   * @param {NavParams} navParams
   * @param {ServerApiProvider} serverApiProvider
   */
  constructor(protected viewCtrl: ViewController, protected loadingCtrl: LoadingController, protected navParams: NavParams, protected serverApiProvider: ServerApiProvider) {
    this.server = navParams.get('server');
    this.param = {serverName: this.server.name, ip: this.server.public_net.ipv4.ip};
  }

  /**
   * make the api call and save the settings
   */
  public saveReverseDNS() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.changeReverseDNS(this.server.id, this.server.public_net.ipv4.ip, this.server.public_net.ipv4.dns_ptr).then(() => {
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
