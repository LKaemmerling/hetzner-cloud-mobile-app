import {Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {ProjectsService} from "../../modules/hetzner-cloud-data/project/projects.service";
import {HomePage} from "../home/home";

/**
 * This page contains a button to remove all data stored from the app
 */
@Component({
  selector: 'page-delete-all-data',
  templateUrl: 'delete-all-data.html',
})
export class DeleteAllDataPage {
  /**
   * Constructor
   * @param {NavController} navCtrl
   * @param {Storage} storage
   * @param {ProjectsService} projects
   * @param {LoadingController} loadingCtrl
   */
  constructor(protected navCtrl: NavController, protected storage: Storage, protected projects: ProjectsService, protected loadingCtrl: LoadingController) {
  }

  /**
   * This Action delete all data from the storage
   */
  deleteAll() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.storage.clear();
    this.projects.loadProjects();
    this.projects.actual_project = null;
    this.navCtrl.setRoot(HomePage);
    loader.dismiss();
  }

}
