import {Component} from '@angular/core';
import {ProjectsService} from "../../models/project/ProjectsService";
import {ActionSheetController, ModalController} from "ionic-angular";
import {addProjectModal} from "./addProject/addProject";
import {project} from "../../models/project/project";
import {TranslateService} from "@ngx-translate/core";
import {ServersService} from "../../models/servers/ServersService";
import {Storage} from "@ionic/storage";
import {shareProjectModal} from "./shareProject/shareProject";

@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html'
})
export class ProjectsPage {
  public _projects = [];
  public visible = [];
  public experimental_shareable_projects: boolean = false;

  constructor(public project: ProjectsService, public modal: ModalController, public actionSheetCtrl: ActionSheetController, public translate: TranslateService, public serversService: ServersService, public storage: Storage) {
    this._projects = project.projects;
    storage.get('experimental_shareable_projects').then((val) => {
      if (val != undefined) {
        this.experimental_shareable_projects = val;
      }
    });
  }

  openSubMenu(menuId) {
    this.visible = [];
    this.visible[menuId] = true;
  }

  openProjectModal() {
    let modal = this.modal.create(addProjectModal);
    modal.onDidDismiss(() => {
      this._projects = this.project.projects;
    });
    modal.present();
  }

  selectProject(project: project) {
    this.project.selectProject(project).then(() => {
      this.serversService.reloadServers();
    });

  }

  search(ev) {
    // Reset items back to all of the items
    this._projects = this.project.projects;

    // set val to the value of the ev target
    var val = ev.target.value;

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

  public openShareModal(project: project) {
    let modal = this.modal.create(shareProjectModal, {project: project});
    modal.onDidDismiss(() => {
      this._projects = this.project.projects;
    });
    modal.present();
  }

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
}
