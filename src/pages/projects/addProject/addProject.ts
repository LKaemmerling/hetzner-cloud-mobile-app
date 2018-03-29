import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {project} from "../../../models/project/project";
import {ViewController} from "ionic-angular";
import {LocationApiProvider} from "../../../providers/location-api/location-api";
import {TranslateService} from "@ngx-translate/core";
import {Storage} from "@ionic/storage";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {NetworkProvider} from "../../../models/network/network";

@Component({
  selector: 'modal-addProject',
  templateUrl: 'addProject.html'
})
export class addProjectModal {
  public project_name: string;
  public api_key: string;
  public error: string = null;
  public image: string = '';

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public network: NetworkProvider, protected translate: TranslateService, protected storage: Storage, public barcodeScanner: BarcodeScanner) {

  }

  public scanProject() {
    this.barcodeScanner.scan().then((barcodeData) => {
      try {
        let payload = JSON.parse(barcodeData.text);
        this.project_name = payload['name'];
        this.api_key = payload['api_key'];
      } catch (e) {
        this.error = 'PAGE.PROJECTS.MODAL.ADD.ERRORS.SCAN_ERROR';
      }
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

    this.network.quickTestApiKey(this.api_key).then(() => {
      var _new = new project(this.project_name, this.api_key);
      this.project.addProject(_new);
      this.project.selectProject(_new);
      this.project.saveProjects();
      this.dismiss();
    }, () => {
      this.error = 'PAGE.PROJECTS.MODAL.ADD.ERRORS.INVALID_KEY';
    });
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
