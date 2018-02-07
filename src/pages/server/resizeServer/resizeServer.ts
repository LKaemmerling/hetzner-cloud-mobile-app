import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../providers/server-api/server-api";
import {ServerTypeApiProvider} from "../../../providers/server-type-api/server-type-api";

@Component({
  selector: 'modal-resizeServer',
  templateUrl: 'resizeServer.html'
})
export class resizeServerModal {
  public server: any;
  public server_types: Array<any> = [];
  public server_type: any;
  public upgrade_disk: false;

  public error: string = null;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public serverApiProvider: ServerApiProvider, public navParams: NavParams, public navCtrl: NavController, public serverTypeApiProvider: ServerTypeApiProvider, public loadingCtrl: LoadingController) {
    this.server = navParams.get('server');
    serverTypeApiProvider.getServerTypes().then((data) => {
      data['server_types'].forEach((type, key) => {
        if (type.storage_type == this.server.server_type.storage_type) {
          this.server_types.push(type);
        }
      });
    })
  }


  public resizeServer() {

    if (this.server_type == null) {
      this.error = 'Bitte wählen Sie einen Server Typ aus';
      return;
    }
    var loader = this.loadingCtrl.create();
    loader.present();
    if (this.upgrade_disk == null || this.upgrade_disk == undefined) {
      this.upgrade_disk = false;
    }
    this.serverApiProvider.changeServerType(this.server.id, this.server_type.id, this.upgrade_disk).then((data) => {
      loader.dismiss();
    }, (error) => {
      this.error = 'Leider gab es einen Anfrage Fehler.';
    });

    this.dismiss();
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
