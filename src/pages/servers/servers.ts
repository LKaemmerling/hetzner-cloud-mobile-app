import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProjectsService} from "../../models/project/ProjectsService";
import {RestProvider} from "../../providers/rest/rest";

@Component({
  selector: 'page-servers',
  templateUrl: 'servers.html'
})
export class ServersPage {
  public servers;

  constructor(public navCtrl: NavController, public project: ProjectsService, public restProvider: RestProvider) {
    this.loadServers();
  }

  public loadServers() {
    this.restProvider.getServers().then((data) => {
      this.servers = data['servers'];
    });
  }
  public refresh(refresher){
    this.loadServers();
    refresher.complete();
  }


}
