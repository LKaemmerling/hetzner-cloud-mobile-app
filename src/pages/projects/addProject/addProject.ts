import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {project} from "../../../models/project/project";
import {ViewController} from "ionic-angular";
import {LocationApiProvider} from "../../../providers/location-api/location-api";
import {TranslateService} from "@ngx-translate/core";
import {Storage} from "@ionic/storage";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

@Component({
  selector: 'modal-addProject',
  templateUrl: 'addProject.html'
})
export class addProjectModal {
  public project_name: string;
  public api_key: string;
  public error: string = null;
  public experimental_shareable_projects: boolean = false;
  public image: string = '';

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public locationApiProvider: LocationApiProvider, protected translate: TranslateService, protected storage: Storage, public barcodeScanner: BarcodeScanner) {
    storage.get('experimental_shareable_projects').then((val) => {
      if (val != undefined) {
        this.experimental_shareable_projects = val;
      }
    });
  }

  public scanProject() {
    this.barcodeScanner.scan().then((barcodeData) => {
     let payload = JSON.parse(barcodeData.text);
      this.project_name = payload['project_name'];
      this.api_key = payload['api_key'];
    }, (err) => {
      this.error = 'PAGE.PROJECTS.MODAL.ADD.ERRORS.SCAN_ERROR';
      return;
    });
  }

  public saveProject() {
    if (this.project_name == null || this.project_name.length == 0) {
      this.error = 'PAGE.PROJECTS.MODAL.ADD.ERRORS.REQUIRED_NAME';
      return;
    }
    if (this.project.projects != null && this.project.projects.filter(vendor => (vendor.name === this.project_name)).length > 0) {
      this.error = 'PAGE.PROJECTS.MODAL.ADD.ERRORS.NAME_ALREADY_USED';
      return;
    }
    ;
    var _new = new project(this.project_name, this.api_key);
    this.project.addProject(_new);

    var selected = null;
    if (this.project.actual_project != null) {
      selected = this.project.actual_project;
    }
    this.project.selectProject(_new);
    this.locationApiProvider.getLocations().then(() => {
      if (selected != null) {
        this.project.selectProject(selected);
      }
      this.project.saveProjects();
      this.dismiss();
    }, () => {
      this.error = 'PAGE.PROJECTS.MODAL.ADD.ERRORS.INVALID_KEY';
      this.project.removeProject(_new);
      if (selected != null) {
        this.project.selectProject(selected);
      }
    });

  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
