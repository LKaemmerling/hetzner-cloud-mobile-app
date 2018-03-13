import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../providers/server-api/server-api";

import RFB from '@novnc/novnc/core/rfb.js';
import {Keyboard} from "@ionic-native/keyboard";

@Component({
  selector: 'modal-console',
  templateUrl: 'console.html'
})
export class consoleModal {
  public server: any;
  public payload;
  public rfb;

  constructor(public viewCtrl: ViewController, public serverApiProvider: ServerApiProvider, public navParams: NavParams, public navCtrl: NavController, public loadingCtrl: LoadingController, public keyboard: Keyboard) {
    this.server = navParams.get('server');
    this.serverApiProvider.requestConsole(this.server.id).then((response) => {
      this.rfb = new RFB(document.getElementById('console_container'), response['wss_url'], {credentials: {password: response['password']}});
      document.getElementById('noVNC_keyboardinput').click();
      //this.keyboard.show();
      this.rfb.focus();
    });
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}