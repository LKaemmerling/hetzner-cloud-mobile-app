import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {project} from "../../../models/project/project";
import {ViewController} from "ionic-angular";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'modal-addProject',
  templateUrl: 'addProject.html'
})
export class addProjectModal {
  public project_name: string;
  public api_key: string;

  constructor(public project: ProjectsService, public viewCtrl: ViewController) {
    //alert(this.project.)
  }

  public saveProject() {

    this.project.addProject(new project(this.project_name, this.api_key));
    this.project.saveProjects();
    if (this.project.projects != null && this.project.projects.length == 1) {
      this.project.selectProject(this.project.projects[0]);
    }

    this.dismiss();
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
