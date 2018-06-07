import {Storage} from "@ionic/storage";
import {project} from "./project";
import {Injectable} from '@angular/core';
import {NetworkProvider} from "../../hetzner-app/network/network";

/**
 * Service that contains all storage methods for the projects.
 */
@Injectable()
export class ProjectsService {
  /**
   * All projects
   * @type {any[]}
   */
  public projects: Array<project> = [];
  /**
   * The currently selected project
   * @type {null}
   */
  public actual_project: project = null;

  /**
   * Constructor
   * @param {Storage} storage
   * @param {NetworkProvider} network
   */
  constructor(private storage: Storage, private network: NetworkProvider) {
    this.projects = [];
  }

  private checkProjects() {
    return new Promise((resolve) => {
      this.projects.forEach((project) => {
        this.network.quickTestApiKey(project.api_key).then((result) => {
          project.revoked = false;
          if (project.meta == undefined) {
            project.meta = {servers_count: result['servers_count']};
          }
          project.meta.servers_count = result['servers_count'];
          console.log(project.meta)
        }, () => {
          project.revoked = true;
        });
        resolve();
      });
    })
  }

  /**
   * Load all projects from the local storage
   */
  public loadProjects() {
    return new Promise((resolve, reject) => {
      this.storage.get('projects').then((val) => {
        if (val !== undefined) {
          this.projects = val;
        }

        this.checkProjects().then(() => {

          this.storage.get('actual_project').then((val) => {
            if (val !== undefined && val !== null) {

              this.network.quickTestApiKey(val.api_key).then((result) => {
                val.revoked = false;
                if (val.meta == undefined) {
                  val.meta = {servers_count: result['servers_count']};
                }
                val.meta.servers_count = result['servers_count'];
                this.actual_project = val;
                resolve();
              }, () => {
                val.revoked = true;
                this.actual_project = val;
                resolve();
              });

            }
          });
        });
      });

    });
  }

  /**
   * Select a project as currently selected project
   * @param {project} project
   * @returns {() => Promise<void>}
   */
  public selectProject(project
                         :
                         project
  ) {
    return new Promise((resolve) => {
      this.actual_project = project;
      this.storage.set('actual_project', this.actual_project);
      resolve(project);
    });
  }

  /**
   * Save all projects to the storage
   */
  public

  saveProjects() {
    this.storage.set('projects', this.projects);
  }

  /**
   * Add a new project to the storage
   * @param {project} project
   */
  public addProject(project
                      :
                      project
  ) {
    if (this.projects == null) {
      this.projects = [];
    }
    this.projects.push(project);
  }

  /**
   * Remove a project from the storage
   * @param {project} project
   */
  public removeProject(project
                         :
                         project
  ) {
    var tmp = [];
    if (this.actual_project == null || (this.actual_project.api_key == project.api_key)) {
      this.actual_project = null;
    }
    this.projects.forEach((_project, key) => {

      if (project.name !== _project.name && _project.api_key !== project.api_key) {
        tmp.push(_project);
      }
    });
    this.projects = tmp;
    this.saveProjects();
    return this.projects;
  }

}
