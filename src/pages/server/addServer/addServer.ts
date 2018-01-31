import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../providers/server-api/server-api";
import {ServerTypeApiProvider} from "../../../providers/server-type-api/server-type-api";
import {ImageApiProvider} from "../../../providers/image-api/image-api";
import {LocationApiProvider} from "../../../providers/location-api/location-api";
import {SshKeyApiProvider} from "../../../providers/ssh-key-api/ssh-key-api";

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

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public serverApiProvider: ServerApiProvider, public serverTypeApiProvider: ServerTypeApiProvider, public imageApiProvider:ImageApiProvider, public locationApiProvider: LocationApiProvider, public sshKeyApiProvider:SshKeyApiProvider) {
    locationApiProvider.getLocations().then((data) => {
      this.locations = data['locations'];
    });
    imageApiProvider.getImages().then((data) => {
      this.images = data['images'];
    });
    serverTypeApiProvider.getServerTypes().then((data) => {
      this.server_types = data['server_types'];
    });
    sshKeyApiProvider.getSSHKeys().then((data) => {
      this.ssh_keys = data['ssh_keys'];
    })
  }


  public createServer() {

    this.serverApiProvider.createServer(this.name, this.server_type.id, this.location, this.start_after_create, this.image, this.ssh_key).then(() => {
      this.dismiss();
    });
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
