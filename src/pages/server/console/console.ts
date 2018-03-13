import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../providers/server-api/server-api";
import {DomSanitizer} from "@angular/platform-browser";

import RFB from '@novnc/novnc/core/rfb.js';

@Component({
  selector: 'modal-console',
  templateUrl: 'console.html'
})
export class consoleModal {
  public server: any;
  public payload;
  public rfb;

  constructor(public viewCtrl: ViewController, public serverApiProvider: ServerApiProvider, public navParams: NavParams, public navCtrl: NavController, public loadingCtrl: LoadingController, public santizer: DomSanitizer) {
    this.server = navParams.get('server');
    this.serverApiProvider.requestConsole(this.server.id).then((response) => {
      this.rfb = new RFB(document.getElementById('console_container'), response['wss_url'], {credentials: {password: response['password']}});
      this.rfb.focus();
    });
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
