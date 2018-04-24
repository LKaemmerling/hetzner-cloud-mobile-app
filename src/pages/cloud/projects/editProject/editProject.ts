import { Component } from '@angular/core';
import { ProjectsService } from '../../../../modules/hetzner-cloud-data/project/projects.service';
import { project } from '../../../../modules/hetzner-cloud-data/project/project';
import { NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * This modal makes it possible to rename the selected project
 */
@Component({
    selector: 'modal-editProject',
    templateUrl: 'editProject.html',
})
export class editProjectModal {
    /**
     * the project that should be edited
     */
    public project: project;
    /**
     * if there is an error this would be displayed here
     * @type {string}
     */
    public error: string = null;

    /**
     * Constructor
     * @param {ProjectsService} projectService
     * @param {ViewController} viewCtrl
     * @param {NavParams} navParams
     * @param {TranslateService} translate
     */
    constructor(
        protected projectService: ProjectsService,
        protected viewCtrl: ViewController,
        protected navParams: NavParams,
        protected translate: TranslateService
    ) {
        this.project = this.navParams.get('project');
    }

    /**
     * Save the given project
     */
    public saveProject() {
        if (this.project.name == null || this.project.name.length == 0) {
            this.error = 'PAGE.PROJECTS.MODAL.ADD.ERRORS.REQUIRED_NAME';
            return;
        }
        if (
            this.projectService.projects != null &&
            this.projectService.projects.filter(vendor => vendor.name === this.project.name).length > 1
        ) {
            this.error = 'PAGE.PROJECTS.MODAL.ADD.ERRORS.NAME_ALREADY_USED';
            return;
        }

        this.projectService.saveProjects();
        this.dismiss();
    }

    /**
     * Dismiss the modal
     */
    public dismiss() {
        this.viewCtrl.dismiss();
    }
}
