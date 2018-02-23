import {Component} from '@angular/core';
import {LoadingController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../../providers/server-api/server-api";


@Component({
  selector: 'modal-changeIPv6ReverseDNS',
  templateUrl: 'changeIPv6ReverseDNS.html'
})
export class changeIPv6ReverseDNSModal {
  public server: any;
  public param: any;

  constructor(public viewCtrl: ViewController, public loadingCtrl: LoadingController, navParams: NavParams, public serverApiProvider: ServerApiProvider) {
    this.server = navParams.get('server');
    this.param = {serverName: this.server.name};
  }

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

  public addEntry() {
    this.server.public_net.ipv6.dns_ptr.push({ip: '', dns_ptr: ''});
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
