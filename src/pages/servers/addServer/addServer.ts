import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {ViewController} from "ionic-angular";
import {RestProvider} from "../../../providers/rest/rest";

@Component({
  selector: 'modal-addServer',
  templateUrl: 'addServer.html'
})
export class addServerModal {
  public name: string;
  public server_type: any;
  public server_types: Array<any>;
  public location: number;
  public locations: Array<any>;
  public ssh_key: Array<any>;
  public ssh_keys: Array<any>;
  public image: number;
  public images: Array<any>;
  public start_after_create: boolean = true;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public rest: RestProvider) {
    rest.getLocations().then((data) => {
      this.locations = data['locations'];
    })
    rest.getImages().then((data) => {
      this.images = data['images'];
    })
    rest.getServerTypes().then((data) => {
      this.server_types = data['server_types'];
    })
    rest.getSSHKeys().then((data) => {
      this.ssh_keys = data['ssh_keys'];
    })
  }


  public createServer() {

    this.rest.createServer(this.name, this.server_type.id, this.location, this.start_after_create, this.image, this.ssh_key).then(() => {
      this.dismiss();
    });
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
