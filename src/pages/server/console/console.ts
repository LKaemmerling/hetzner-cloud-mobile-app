import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../providers/server-api/server-api";
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'modal-console',
  templateUrl: 'console.html'
})
export class consoleModal {
  public server: any;
  public password: string = null;
  public wss_url: any = null;
  public vnc_url: string = null;
  public payload;

  constructor(public viewCtrl: ViewController, public serverApiProvider: ServerApiProvider, public navParams: NavParams, public navCtrl: NavController, public loadingCtrl: LoadingController, public santizer: DomSanitizer) {
    const parseUrl = require('parse-url');
    this.server = navParams.get('server');
    this.serverApiProvider.requestConsole(this.server.id).then((response) => {
      this.wss_url = parseUrl(response['wss_url']);
      console.log(this.wss_url);
      this.password = response['password'];
      this.vnc_url = 'assets/novnc/vnc.html?host=' + this.wss_url.resource + '&password=' + this.password + "&autoconnect=true&encrypt=true&resize=remote&server_id=" + this.wss_url.query.server_id + "&token=" + this.wss_url.query.token;
      this.payload = santizer.bypassSecurityTrustHtml('<iframe src="' + this.vnc_url + '" scrolling="no" frameborder="0"></iframe>')
    });
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
