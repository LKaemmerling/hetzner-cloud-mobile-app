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
    if (this.projects.length == 0) {
      this.projects = [];
    }
    this.projects.push(project);
  }
}
