import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {LoadingController, ViewController} from "ionic-angular";
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

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public serverApiProvider: ServerApiProvider, public serverTypeApiProvider: ServerTypeApiProvider, public imageApiProvider: ImageApiProvider, public locationApiProvider: LocationApiProvider, public sshKeyApiProvider: SshKeyApiProvider, public loadingCtrl: LoadingController, public serverService: ServersService) {
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
      this.error = 'Bitte wählen Sie einen Server Typ aus.';
      return;
    }
    if (this.location == null) {
      this.error = 'Bitte wählen Sie einen Standort aus.';
      return;
    }
    if (this.image == null) {
      this.error = 'Bitte wählen Sie einen Image aus.';
      return;
    }
    if (this.name == null || this.name.length < 3) {
      this.error = 'Bitte geben Sie eine Bezeichnung an.';
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
      this.error = 'Leider gab es einen Anfrage Fehler.';
    });
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
