import {Component} from '@angular/core';
import {ProjectsService} from "../../models/project/ProjectsService";
import {ActionSheetController, ItemSliding, ModalController} from "ionic-angular";
import {addProjectModal} from "./addProject/addProject";
import {project} from "../../models/project/project";

@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html'
})
export class ProjectsPage {
  public _projects = [];

  constructor(public project: ProjectsService, public modal: ModalController, public actionSheetCtrl: ActionSheetController) {
    this._projects = project.projects;
  }

  openProjectModal() {
    let modal = this.modal.create(addProjectModal);
    modal.onDidDismiss(() => {
      this._projects = this.project.projects;
    });
    modal.present();
  }

  select(project: project, slidingItem: ItemSliding) {
    this.project.selectProject(project);
    slidingItem.close();
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
    this.project.removeProject(project);
  }

  public openActionSheets(project: project) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Aktionen für das Projekt ' + project.name,
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Löschen',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.delete(project);
          }
        },
        {
          text: 'Aktivieren',
          icon: 'checkmark',
          handler: () => {
            this.project.selectProject(project);
          }
        },
        {
          text: 'Abbrechen',
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
