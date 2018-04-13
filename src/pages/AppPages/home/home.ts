import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {ProjectsService} from "../../../modules/hetzner-cloud-data/project/projects.service";
import {ProjectsPage} from "../../projects/projects";
import {addProjectModal} from "../../projects/addProject/addProject";

/**
 * This is the basic start screen
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  /**
   * Constructor
   * @param {NavController} navCtrl
   * @param {ProjectsService} project
   * @param {ModalController} modal
   */
  constructor(protected navCtrl: NavController, protected project: ProjectsService, protected modal: ModalController) {

  }

  /**
   * This open the create project modal
   */
  public openCreateProject() {

    let modal = this.modal.create(addProjectModal);
    modal.onDidDismiss(() => {
      this.navCtrl.setRoot(ProjectsPage);
    });
    modal.present();
  }
}
