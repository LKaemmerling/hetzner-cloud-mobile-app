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
    this.navCtrl.setRoot(ProjectsPage);
    this.modal.create(addProjectModal).present();
  }
}
