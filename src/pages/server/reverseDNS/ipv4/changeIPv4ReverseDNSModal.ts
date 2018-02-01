import {Component} from '@angular/core';
import {LoadingController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../../providers/server-api/server-api";


@Component({
  selector: 'modal-changeIPv4ReverseDNS',
  templateUrl: 'changeIPv4ReverseDNS.html'
})
export class changeIPv4ReverseDNSModal {
  public server: any;

  constructor(public viewCtrl: ViewController, public loadingCtrl: LoadingController, navParams: NavParams, public serverApiProvider: ServerApiProvider) {
    this.server = navParams.get('server');
  }

  public saveReverseDNS() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.changeReverseDNS(this.server.id, this.server.public_net.ipv4.ip, this.server.public_net.ipv4.dns_ptr).then(() => {
      loader.dismiss();
      this.dismiss();
    });
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
