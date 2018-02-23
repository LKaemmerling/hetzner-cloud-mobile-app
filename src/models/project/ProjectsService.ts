import {Storage} from "@ionic/storage";
import {project} from "./project";
import {Injectable} from '@angular/core';

@Injectable()
export class ProjectsService {
  /**
   *
   * @type {any[]}
   */
  public projects: Array<project> = [];
  /**
   *
   * @type {null}
   */
  public actual_project: project = null;

  /**
   *
   * @param {Storage} storage
   */
  constructor(private storage: Storage) {
    this.projects = [];
  }

  /**
   *
   */
  public loadProjects() {
    this.storage.get('projects').then((val) => {
      if (val !== undefined) {
        this.projects = val;
      }
    });
    this.storage.get('actual_project').then((val) => {
      if (val !== undefined) {
        this.actual_project = val;
      }
    });
  }

  /**
   *
   * @param {project} project
   * @returns {() => Promise<void>}
   */
  public selectProject(project: project) {
    return new Promise((resolve) => {
      this.actual_project = project;
      this.storage.set('actual_project', this.actual_project);
      resolve(project);
    });
  }

  /**
   *
   */
  public saveProjects() {
    this.storage.set('projects', this.projects);
  }

  /**
   *
   * @param {project} project
   */
  public addProject(project: project) {
    if (this.projects == null) {
      this.projects = [];
    }
    this.projects.push(project);
  }

  /**
   *
   * @param {project} project
   */
  public removeProject(project: project) {
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
  }
}
