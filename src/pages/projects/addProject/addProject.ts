import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {project} from "../../../models/project/project";
import {LoadingController, ViewController} from "ionic-angular";
import {LocationApiProvider} from "../../../providers/location-api/location-api";
import {TranslateService} from "@ngx-translate/core";
import {Camera} from "@ionic-native/camera";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'modal-addProject',
  templateUrl: 'addProject.html'
})
export class addProjectModal {
  public project_name: string;
  public api_key: string;
  public error: string = null;
  public experimental_ocr_reading: boolean = false;
  public image: string;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public locationApiProvider: LocationApiProvider, protected translate: TranslateService, protected camera: Camera, public storage: Storage, public loadingCtrl: LoadingController) {
    storage.get('experimental_ocr_reading').then(value => {
      if (value != undefined) {
        this.experimental_ocr_reading = value;
      }
    });
  }

  public scanApiKey() {
    this.camera.getPicture({
      quality: 100,
      destinationType: 0, // DATA_URL
      sourceType: 1,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.image = `data:image/jpeg;base64,${imageData}`;
      let loader = this.loadingCtrl.create();
      loader.present();
      (<any>window).OCRAD(document.getElementById('image'), text => {
        loader.dismissAll();
        this.api_key = text;
      });
    }, (err) => {
      console.log(`ERROR -> ${JSON.stringify(err)}`);
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
