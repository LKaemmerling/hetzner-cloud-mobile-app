import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {ProjectsService} from '../../../modules/hetzner-cloud-data/project/projects.service';
import {ProjectsPage} from '../../cloud/projects/projects';
import {addProjectModal} from '../../cloud/projects/addProject/addProject';
import {SplashScreen} from "@ionic-native/splash-screen";

/**
 * This is the basic start screen
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  /**
   * Constructor
   * @param {NavController} navCtrl
   * @param {ProjectsService} project
   * @param {ModalController} modal
   */
  constructor(
    protected navCtrl: NavController,
    protected project: ProjectsService,
    protected modal: ModalController
  ) {
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
