import {Component} from '@angular/core';
import {LoadingController, ModalController, NavController} from 'ionic-angular';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {ServerPage} from "../server";
import {addServerModal} from "../addServer/addServer";
import {ServerApiProvider} from "../../../providers/server-api/server-api";
import {ServersService} from "../../../models/servers/ServersService";

@Component({
  selector: 'page-servers',
  templateUrl: 'servers.html'
})
export class ServersPage {

  public servers;
  public _search;

  constructor(public navCtrl: NavController, public project: ProjectsService, public serverApiProvider: ServerApiProvider, public modal: ModalController, public loadingCtrl: LoadingController, public serversService: ServersService) {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.serversService.loadServers();
    if (this.serversService.servers == null || this.serversService.servers.length == 0 || this.serversService.servers == undefined) {
      this.loadServers();
    } else {
      this.servers = this._search = this.serversService.servers;
    }
    loader.dismiss();
  }

  public loadServers() {
    this.serverApiProvider.getServers().then((data) => {
      this.servers = this.serversService.servers = data['servers'];
      this.serversService.saveServers();
      this._search = this.servers;
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
      var loader = this.loadingCtrl.create();
      loader.present();
      this.serverApiProvider.delete(server.id).then((data) => {
        this.loadServers()
        loader.dismiss();
      });
    }
  }

  search(ev) {
    // Reset items back to all of the items
    this._search = this.servers;
// set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this._search = this.servers.filter((item) => {
        if (item == null) {
          return false;
        }
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  openCreateServerModal() {
    this.modal.create(addServerModal).present();
  }
}
