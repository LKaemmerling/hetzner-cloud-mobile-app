import {Component} from '@angular/core';
import {ProjectsService} from "../../modules/hetzner-cloud-data/project/projects.service";
import {ActionSheetController, ModalController} from "ionic-angular";
import {addProjectModal} from "./addProject/addProject";
import {project} from "../../modules/hetzner-cloud-data/project/project";
import {TranslateService} from "@ngx-translate/core";
import {ServersService} from "../../modules/hetzner-cloud-data/servers/servers.service";
import {Storage} from "@ionic/storage";
import {shareProjectModal} from "./shareProject/shareProject";
import {state, style, transition, trigger, useAnimation} from "@angular/animations";
import {fadeIn, fadeOut} from "ng-animate";
import {editProjectModal} from "./editProject/editProject";
import {PricingService} from "../../modules/hetzner-cloud-data/pricings/pricing.service";
import {HetznerCloudDataService} from "../../modules/hetzner-cloud-data/hetzner-cloud-data.service";
import {NetworkProvider} from "../../modules/hetzner-app/network/network";

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
   *
   * @type {project[]}
   */
  public _projects: Array<project> = [];
  /**
   *
   * @type {any[]}
   */
  public visible = [];

  /**
   *
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
    protected network: NetworkProvider
  ) {
    this._projects = project.projects;

  }

  /**
   *
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
   *
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
   *
   */
  openCreateProjectModal() {
    if (this.network.has_connection) {
      let modal = this.modal.create(addProjectModal);
      modal.onDidDismiss(() => {
        this._projects = this.project.projects;
      });
      modal.present();
    } else {
      this.network.displayNoNetworkNotice();
    }
  }

  /**
   *
   * @param {project} project
   */
  public openShareModal(project: project) {
    let modal = this.modal.create(shareProjectModal, {project: project});
    modal.onDidDismiss(() => {
      this._projects = this.project.projects;
    });
    modal.present();
  }

  /**
   *
   * @param {project} project
   */
  public openActionSheets(project: project) {
    let _title: string = '';
    this.translate.get('PAGE.PROJECTS.ACTIONS.TITLE', {projectName: project.name}).subscribe((text) => {
      _title = text;
    });
    let _delete: string = '';
    this.translate.get('ACTIONS.DELETE').subscribe(text => {
      _delete = text;
    });
    let _activate: string = '';
    this.translate.get('ACTIONS.ACTIVATE').subscribe(text => {
      _activate = text;
    });
    let _cancel: string = '';
    this.translate.get('ACTIONS.CANCEL').subscribe(text => {
      _cancel = text;
    });
    let actionSheet = this.actionSheetCtrl.create({
      title: _title,
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: _delete,
          role: 'destructive',
          icon: 'trash',
          cssClass: 'delete_project',
          handler: () => {
            this.delete(project);
          }
        },
        {
          text: _activate,
          icon: 'checkmark',
          cssClass: 'activate_project',
          handler: () => {
            this.selectProject(project);
          }
        },
        {
          text: _cancel,
          role: 'cancel', // will always sort to be on the bottom
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  /**
   *
   * @param {project} project
   */
  selectProject(project: project) {
    if (this.network.has_connection) {
      this.project.selectProject(project).then(() => {
        this.hetznerCloudDataService.loadDataFromStorage();
      });
    } else {
      this.network.displayNoNetworkNotice();
    }
  }

  /**
   *
   * @param event
   */
  search(event) {
    // Reset items back to all of the items
    this._projects = this.project.projects;

    // set val to the value of the ev target
    var val = event.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this._projects = this._projects.filter((item) => {
        if (item == null) {
          return false;
        }
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  /**
   *
   * @param {project} project
   */
  public delete(project: project) {
    this._projects = this.project.removeProject(project);
    if (this.project.projects == null || this.project.projects.length == 0) {
      this.project.selectProject(null).then(() => {
        this.serversService.servers = [];
        this.serversService.saveServers();
      });
    } else {
      this.project.selectProject(this.project.projects[0]).then(() => {
        this.serversService.servers = [];
        this.serversService.saveServers();
      });
    }
    this._projects = this.project.projects;
  }
}
