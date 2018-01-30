import {Component} from '@angular/core';
import {ProjectsService} from "../../models/project/ProjectsService";
import {ItemSliding, ModalController} from "ionic-angular";
import {addProjectModal} from "./addProject/addProject";
import {project} from "../../models/project/project";

@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html'
})
export class ProjectsPage {

  constructor(public project: ProjectsService, public modal: ModalController) {
    //alert(this.project.)
  }

  openProjectModal() {
    this.modal.create(addProjectModal).present();
  }

  select(project: project, slidingItem: ItemSliding) {
    this.project.selectProject(project);
    slidingItem.close();
  }
}
