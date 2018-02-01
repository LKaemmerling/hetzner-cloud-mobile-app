import {Component} from '@angular/core';
import {LoadingController, ModalController, NavController} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public project: ProjectsService, public serverApiProvider: ServerApiProvider, public modal: ModalController, public loadingCtrl: LoadingController) {
    this.loadServers();
  }

  public loadServers() {
    this.serverApiProvider.getServers().then((data) => {
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
      var loader = this.loadingCtrl.create();
      loader.present();
      this.serverApiProvider.delete(server.id).then((data) => {
        this.loadServers()
        loader.dismiss();
      });
    }
  }

  search(ev) {
    this._search = true;
    // Reset items back to all of the items
    this.loadServers();
// set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.servers = this.servers.filter((item) => {
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
