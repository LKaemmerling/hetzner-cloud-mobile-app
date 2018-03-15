import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {project} from "../../../models/project/project";
import {NavParams, ViewController} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'modal-editProject',
  templateUrl: 'editProject.html'
})
export class editProjectModal {
  public project: project;
  public api_key: string;
  public error: string = null;
  public image: string = '';

  constructor(public projectService: ProjectsService, public viewCtrl: ViewController, public navparams: NavParams, protected translate: TranslateService, protected storage: Storage) {
    this.project = this.navparams.get('project');
  }

  public saveProject() {
    if (this.project.name == null || this.project.name.length == 0) {
      this.error = 'PAGE.PROJECTS.MODAL.ADD.ERRORS.REQUIRED_NAME';
      return;
    }
    if (this.projectService.projects != null && this.projectService.projects.filter(vendor => (vendor.name === this.project.name)).length > 1) {
      this.error = 'PAGE.PROJECTS.MODAL.ADD.ERRORS.NAME_ALREADY_USED';
      return;
    }

    this.projectService.saveProjects();
    this.dismiss();


  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
