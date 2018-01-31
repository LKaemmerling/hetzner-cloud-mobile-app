import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {App, NavController, NavParams, ViewController} from "ionic-angular";
import {RestProvider} from "../../../providers/rest/rest";

@Component({
  selector: 'modal-resizeServer',
  templateUrl: 'resizeServer.html'
})
export class resizeServerModal {
  public server: any;
  public server_types: Array<any> = [];
  public server_type: any;
  public upgrade_disk: false;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public rest: RestProvider, public navParams: NavParams, public navCtrl: NavController, public appCtrl: App) {
    this.server = navParams.get('server');
    rest.getServerTypes().then((data) => {
      data['server_types'].forEach((type, key) => {
        if (type.storage_type == this.server.server_type.storage_type) {
          this.server_types.push(type);
        }
      });
    })
  }


  public resizeServer() {
    if (this.server_type != null) {
      this.rest.changeServerType(this.server.id, this.server_type.id, this.upgrade_disk);
    }
    this.viewCtrl.dismiss();
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
