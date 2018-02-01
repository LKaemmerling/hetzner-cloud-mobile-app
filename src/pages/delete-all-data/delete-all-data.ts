import {Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {ProjectsService} from "../../models/project/ProjectsService";
import {HomePage} from "../home/home";

/**
 * Generated class for the DeleteAllDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-delete-all-data',
  templateUrl: 'delete-all-data.html',
})
export class DeleteAllDataPage {


  constructor(public navCtrl: NavController, public storage: Storage, public projects: ProjectsService, public loadingCtrl: LoadingController) {
  }

  deleteAll() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.storage.clear();
    this.projects.loadProjects();
    this.navCtrl.setRoot(HomePage);
    loader.dismiss();
  }

}
