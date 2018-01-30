import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProjectsService} from "../../models/project/ProjectsService";
import {RestProvider} from "../../providers/rest/rest";
import {ServerPage} from "../server/server";

@Component({
  selector: 'page-servers',
  templateUrl: 'servers.html'
})
export class ServersPage {

  public servers;
  public _search = false;

  constructor(public navCtrl: NavController, public project: ProjectsService, public restProvider: RestProvider) {
    this.loadServers();
  }

  public loadServers(searchTerm = null) {
    this.restProvider.getServers(searchTerm).then((data) => {
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
      this.restProvider.delete(server.id).then((data) => this.loadServers());
    }
  }

  search(ev) {
    this._search = true;
    // Reset items back to all of the items

    this.loadServers(ev.target.value);

  }

}
