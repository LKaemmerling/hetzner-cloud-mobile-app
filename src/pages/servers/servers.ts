import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProjectsService} from "../../models/project/ProjectsService";

@Component({
  selector: 'page-servers',
  templateUrl: 'servers.html'
})
export class ServersPage {

  constructor(public navCtrl: NavController, private project:ProjectsService) {
    //alert(this.project.)
  }

}
