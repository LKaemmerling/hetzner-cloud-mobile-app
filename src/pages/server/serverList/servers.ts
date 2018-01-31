import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {ServerPage} from "../server";
import {addServerModal} from "../addServer/addServer";
import {ServerApiProvider} from "../../../providers/server-api/server-api";

@Component({
  selector: 'page-servers',
  templateUrl: 'servers.html'
})
export class ServersPage {

  public servers;
  public _search = false;

  constructor(public navCtrl: NavController, public project: ProjectsService, public serverApiProvider: ServerApiProvider, public modal: ModalController) {
    this.loadServers();
  }

  public loadServers(searchTerm = null) {
    this.serverApiProvider.getServers(searchTerm).then((data) => {
      this.servers = data['servers'];
    });
  }

  public refresh(refresher) {

    this.loadServers();
    refresher.complete();
  }

  public details(server) {
    this.navCtrl.push(ServerPage, {server: server});
  }

  public delete(server) {
    if (confirm('Möchten Sie den Server ' + server.name + ' wirklich unwiederuflich löschen?')) {
      this.serverApiProvider.delete(server.id).then((data) => this.loadServers());
    }
  }

  search(ev) {
    this._search = true;
    // Reset items back to all of the items

    this.loadServers(ev.target.value);

  }

  openCreateServerModal() {
    this.modal.create(addServerModal).present();
  }
}
