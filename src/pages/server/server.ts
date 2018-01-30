import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ProjectsService} from "../../models/project/ProjectsService";
import {RestProvider} from "../../providers/rest/rest";

@Component({
  selector: 'page-server',
  templateUrl: 'server.html'
})
export class ServerPage {
  public server;
  public powerOn = true;

  constructor(public navCtrl: NavController, public project: ProjectsService, public restProvider: RestProvider, public navParams: NavParams) {
    this.server = navParams.get('server');
    this.powerOn = (this.server.status == 'running');
  }

  public refresh(refresher) {
    this.restProvider.getServer(this.server.id).then((data) => {
      this.server = data['server'];
      refresher.complete();
    });

  }

  public toggleStatus() {
    if (this.powerOn) {
      this.restProvider.powerOff(this.server.id);
    } else {
      this.restProvider.powerOn(this.server.id);
    }
    this.powerOn = !this.powerOn;
  }

}
