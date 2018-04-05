import {Component} from '@angular/core';
import {LoadingController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../../providers/server-api/server-api";
import {Server} from "../../../../modules/hetzner-cloud-data/servers/server";

/**
 * With this modal you can change the ipv4 reverse dns settings of a server/ip
 */
@Component({
  selector: 'modal-changeIPv6ReverseDNS',
  templateUrl: 'changeIPv6ReverseDNS.html'
})
export class changeIPv6ReverseDNSModal {
  /**
   * The specific server
   */
  public server: Server;
  /**
   * The server Name
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
    this.param = {serverName: this.server.name};
  }

  /**
   * Save all the rdns settings
   */
  public saveReverseDNS() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.server.public_net.ipv6.dns_ptr.forEach((dns, key) => {
      this.serverApiProvider.changeReverseDNS(this.server.id, dns.ip, dns.dns_ptr).then(() => {


      });
    });
    loader.dismiss();
    this.viewCtrl.dismiss();

  }

  /**
   * Add a new RDNS Entry
   */
  public addEntry() {
    this.server.public_net.ipv6.dns_ptr.push({ip: '', dns_ptr: ''});
  }

  /**
   * Dismiss the modal
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
