import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {ProjectsService} from "../../models/project/ProjectsService";
import {ProjectsPage} from "../projects/projects";
import {addProjectModal} from "../projects/addProject/addProject";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public project: ProjectsService, public modal: ModalController) {

  }

  public openProjectsPage() {

    let modal = this.modal.create(addProjectModal);
    modal.onDidDismiss(() => {
      this.navCtrl.setRoot(ProjectsPage);
    });
    modal.present();
  }
}
