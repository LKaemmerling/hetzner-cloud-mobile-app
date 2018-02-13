import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {LoadingController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../providers/server-api/server-api";
import {ServerTypeApiProvider} from "../../../providers/server-type-api/server-type-api";
import {ImageApiProvider} from "../../../providers/image-api/image-api";
import {LocationApiProvider} from "../../../providers/location-api/location-api";
import {SshKeyApiProvider} from "../../../providers/ssh-key-api/ssh-key-api";
import {ServersService} from "../../../models/servers/ServersService";

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

  public error: string = null;
  public __selected_image: number = null;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public serverApiProvider: ServerApiProvider, public serverTypeApiProvider: ServerTypeApiProvider, public imageApiProvider: ImageApiProvider, public locationApiProvider: LocationApiProvider, public sshKeyApiProvider: SshKeyApiProvider, public loadingCtrl: LoadingController, public serverService: ServersService, public navParams: NavParams) {
    this.__selected_image = this.navParams.get('selected_image');
    if (this.__selected_image != null) {
      this.image = this.__selected_image;
    }
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
    this.error = null;
    if (this.server_type == null) {
      this.error = 'PAGE.SERVERS.MODAL.ADD.ERRORS.REQUIRED_TYPE';
      return;
    }
    if (this.location == null) {
      this.error = 'PAGE.SERVERS.MODAL.ADD.ERRORS.REQUIRED_LOCATION';
      return;
    }
    if (this.image == null) {
      this.error = 'PAGE.SERVERS.MODAL.ADD.ERRORS.REQUIRED_IMAGE';
      return;
    }
    if (this.name == null || this.name.length < 3) {
      this.error = 'PAGE.SERVERS.MODAL.ADD.ERRORS.REQUIRED_NAME';
      return;
    }
    let loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.createServer(this.name, this.server_type.id, this.location, this.start_after_create, this.image, this.ssh_key).then(() => {
      this.dismiss();
      loader.dismiss();
      this.serverApiProvider.getServers().then((data) => {
        this.serverService.servers = data['servers'];
        this.serverService.saveServers();
      });
    }, (error) => {
      this.error = 'PAGE.SERVERS.MODAL.ADD.ERRORS.NETWORK_ERROR';
    });
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
