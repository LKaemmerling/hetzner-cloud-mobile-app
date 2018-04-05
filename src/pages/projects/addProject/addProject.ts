import {Component} from '@angular/core';
import {ProjectsService} from "../../../modules/hetzner-cloud-data/project/projects.service";
import {project} from "../../../modules/hetzner-cloud-data/project/project";
import {ViewController} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";
import {Storage} from "@ionic/storage";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {NetworkProvider} from "../../../modules/hetzner-app/network/network";

/**
 * Add Project modal
 */
@Component({
  selector: 'modal-addProject',
  templateUrl: 'addProject.html'
})
export class addProjectModal {
  /**
   * The new project that will be created
   */
  protected new_project: project;
  /**
   * the project name
   * @type {string}
   */
  public project_name: string;
  /**
   * the api key
   * @type {string}
   */
  public api_key: string;
  /**
   * if there is an error this would be displayed here
   * @type {string}
   */
  public error: string = null;

  /**
   * Constructor
   * @param {ProjectsService} project
   * @param {ViewController} viewCtrl
   * @param {NetworkProvider} network
   * @param {TranslateService} translate
   * @param {Storage} storage
   * @param {BarcodeScanner} barcodeScanner
   */
  constructor(protected project: ProjectsService,
              protected viewCtrl: ViewController,
              protected network: NetworkProvider,
              protected translate: TranslateService,
              protected storage: Storage,
              protected barcodeScanner: BarcodeScanner) {

  }

  /**
   * Open the  qr-code scanner for easy read shared projects
   */
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

  /**
   * Save the given project and validate it
   */
  public saveProject() {
    if (this.project_name == null || this.project_name.length == 0) {
      this.error = 'PAGE.PROJECTS.MODAL.ADD.ERRORS.REQUIRED_NAME';
      return;
    }
    if (this.project.projects != null && this.project.projects.filter(vendor => (vendor.name === this.project_name)).length > 0) {
      this.error = 'PAGE.PROJECTS.MODAL.ADD.ERRORS.NAME_ALREADY_USED';
      return;
    }


    this.network.quickTestApiKey(this.api_key).then(() => {
      this.new_project.name = this.project_name;
      this.new_project.api_key = this.api_key;
      this.project.addProject(this.new_project);
      this.project.selectProject(this.new_project);
      this.project.saveProjects();
      this.dismiss();
    }, () => {
      this.error = 'PAGE.PROJECTS.MODAL.ADD.ERRORS.INVALID_KEY';
    });
  }

  /**
   * Dismiss the modal
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
