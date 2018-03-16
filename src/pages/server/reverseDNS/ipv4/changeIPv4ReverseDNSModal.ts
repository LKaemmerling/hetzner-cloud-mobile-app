import {Component} from '@angular/core';
import {LoadingController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../../providers/server-api/server-api";
import {Server} from "../../../../models/servers/server";


@Component({
  selector: 'modal-changeIPv4ReverseDNS',
  templateUrl: 'changeIPv4ReverseDNS.html'
})
export class changeIPv4ReverseDNSModal {
  /**
   *
   */
  public server: Server;
  /**
   *
   */
  public param: any;

  /**
   *
   * @param {ViewController} viewCtrl
   * @param {LoadingController} loadingCtrl
   * @param {NavParams} navParams
   * @param {ServerApiProvider} serverApiProvider
   */
  constructor(public viewCtrl: ViewController, public loadingCtrl: LoadingController, navParams: NavParams, public serverApiProvider: ServerApiProvider) {
    this.server = navParams.get('server');
    this.param = {serverName: this.server.name,ip:this.server.public_net.ipv4.ip};
  }

  /**
   *
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
   *
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
