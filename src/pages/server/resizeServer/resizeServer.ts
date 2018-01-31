import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {NavController, NavParams, ViewController} from "ionic-angular";
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

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public serverApiProvider: ServerApiProvider, public navParams: NavParams, public navCtrl: NavController, public serverTypeApiProvider: ServerTypeApiProvider) {
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
    if (this.server_type != null) {
      this.serverApiProvider.changeServerType(this.server.id, this.server_type.id, this.upgrade_disk);
    }
    this.viewCtrl.dismiss();
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
