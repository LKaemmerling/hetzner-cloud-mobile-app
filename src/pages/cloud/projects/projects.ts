import {Component} from '@angular/core';
import {ProjectsService} from "../../../modules/hetzner-cloud-data/project/projects.service";
import {ActionSheetController, LoadingController, ModalController} from "ionic-angular";
import {addProjectModal} from "./addProject/addProject";
import {project} from "../../../modules/hetzner-cloud-data/project/project";
import {TranslateService} from "@ngx-translate/core";
import {ServersService} from "../../../modules/hetzner-cloud-data/servers/servers.service";
import {Storage} from "@ionic/storage";
import {shareProjectModal} from "./shareProject/shareProject";
import {state, style, transition, trigger, useAnimation} from "@angular/animations";
import {fadeIn, fadeOut} from "ng-animate";
import {editProjectModal} from "./editProject/editProject";
import {HetznerCloudDataService} from "../../../modules/hetzner-cloud-data/hetzner-cloud-data.service";
import {NetworkProvider} from "../../../modules/hetzner-app/network/network";
import {HetznerCloudMenuService} from "../../../modules/hetzner-cloud-data/hetzner-cloud-menu.service";

/**
 * This is the project page, where you can create, activate, share and delete projects
 */
@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
  animations: [
    trigger('animate', [
      state('active', style({
        display: 'block',
      })),
      state('*', style({
        display: 'none',
      })),
      transition('* => active', useAnimation(fadeIn, {params: {timing: 0.3, delay: 0}})),
      transition('active => *', useAnimation(fadeOut, {params: {timing: 0, delay: 0}}))])
  ],
})
export class ProjectsPage {
  /**
   * All projects
   * @type {project[]}
   */
  public _projects: Array<project> = [];
  /**
   * Contain all the visible submenus
   * @type {any[]}
   */
  public visible = [];

  /**
   * Constructor
   * @param {ActionSheetController} actionSheetCtrl
   * @param {ModalController} modal
   * @param {HetznerCloudDataService} hetznerCloudDataService
   * @param {ProjectsService} project
   * @param {ServersService} serversService
   * @param {TranslateService} translate
   * @param {Storage} storage
   * @param {NetworkProvider} network
   */
  constructor(
    protected actionSheetCtrl: ActionSheetController,
    protected modal: ModalController,
    protected hetznerCloudDataService: HetznerCloudDataService,
    protected project: ProjectsService,
    protected serversService: ServersService,
    protected translate: TranslateService,
    protected storage: Storage,
    protected network: NetworkProvider,
    protected cloudMenuService: ,
    protected loadingCtrl: LoadingController
  ) {
    this.project.loadProjects().then(() => {

      this._projects = project.projects;
    })

  }

  /**
   * Open a submenu
   * @param menuId
   */
  openSubMenu(menuId) {
    if (this.visible[menuId] != undefined && this.visible[menuId] == 'active') {
      this.visible = [];
    } else {
      this.visible = [];
      this.visible[menuId] = 'active';
    }

  }

  /**
   * Open a Edit modal with the given project
   * @param {project} project
   */
  openEditModal(project: project) {
    let modal = this.modal.create(editProjectModal, {project: project});
    modal.onDidDismiss(() => {
      this._projects = this.project.projects;
    });
    modal.present();
  }

  /**
   * Open a modal for creating new projects
   */
  openCreateProjectModal() {
    if (this.network.has_connection) {
      let modal = this.modal.create(addProjectModal);
      modal.onDidDismiss(() => {
        this.project.loadProjects().then(() => {
          this._projects = this.project.projects;
        });
      });
      modal.present();
    } else {
      this.network.displayNoNetworkNotice();
    }
  }

  /**
   * Open the modal for sharing the given project with a qr-code
   * @param {project} project
   */
  public openShareModal(project: project) {
    let modal = this.modal.create(shareProjectModal, {project: project});
    modal.onDidDismiss(() => {
      this.project.loadProjects();
      this._projects = this.project.projects;
    });
    modal.present();
  }

  /**
   * Select a project so this is the new selected project
   * @param {project} project
   */
  selectProject(project: project) {
    if (this.network.has_connection) {
      this.project.selectProject(project).then(() => {
        this.hetznerCloudDataService.loadDataFromNetwork();
      });
    } else {
      this.network.displayNoNetworkNotice();
    }
  }

  /**
   * Delete a project
   * @param {project} project
   */
  public delete(project: project) {
    this._projects = this.project.removeProject(project);
    if (this.project.projects == null || this.project.projects.length == 0) {
      this.project.selectProject(null).then(() => {
        this.hetznerCloudDataService.loadDataFromNetwork();
        this.cloudMenuService.generateMenu();
        this._projects = this.project.projects;
        let t = this.loadingCtrl.create();
        t.present();
        window.setTimeout(() => window.location.reload(true), 1000);
      });
    } else {
      this.project.selectProject(this.project.projects[0]).then(() => {
        this.hetznerCloudDataService.loadDataFromNetwork();
      });
    }
    this._projects = this.project.projects;
  }
}
