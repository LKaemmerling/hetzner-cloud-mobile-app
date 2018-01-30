import {Storage} from "@ionic/storage";
import {project} from "./project";
import {Injectable} from '@angular/core';

@Injectable()
export class ProjectsService {
  public projects: Array<project> = [];
  public actual_project: project = null;

  constructor(private storage: Storage) {
    this.projects = [];
  }

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

  public selectProject(project: project) {
    this.actual_project = project;
    this.storage.set('actual_project', this.actual_project);
  }

  public saveProjects() {
    this.storage.set('projects', this.projects);
  }

  public addProject(project: project) {
    if (this.projects == null) {
      this.projects = [];
    }
    this.projects.push(project);
  }

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
