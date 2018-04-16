import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ProjectsService} from "../../hetzner-cloud-data/project/projects.service";
import {ConfigService} from "../../hetzner-app/config/config.service";
/**
 * This is the basic provider, that is the parent of all other api providers
 */
@Injectable()
export abstract class HetznerApiProvider {
  /**
   * Constructor
   * @param {HttpClient} http
   * @param {ProjectsService} projectService
   * @param {ConfigService} configService
   */
  constructor(protected http: HttpClient, protected projectService: ProjectsService, protected configService: ConfigService) {
  }

  /**
   * Performs a GET Request against the Hetzner API
   * @param {string} method
   * @returns {Promise<any>}
   * @private
   */
  _get(method: string) {
    return new Promise((resolve, reject = null) => {
      this.http.get(this.configService.api_url + '/' + method, {
        headers: this.getHeaders(),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        if (reject != null) {
          reject(err);
        }
      });
    });
  }

  /**
   * Performs a POST Request against the Hetzner API
   * @param {string} method
   * @param {object} body
   * @returns {Promise<any>}
   * @private
   */
  _post(method: string, body: object = {}) {
    return new Promise((resolve, reject = null) => {
      this.http.post(this.configService.api_url + '/' + method, body, {
        headers: this.getHeaders(),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        if (reject != null) {
          reject(err);
        }
      });
    });
  }

  /**
   * Performs a PUT Request against the Hetzner API
   * @param {string} method
   * @param {object} body
   * @returns {Promise<any>}
   * @private
   */
  _put(method: string, body: object) {
    return new Promise((resolve, reject = null) => {
      this.http.put(this.configService.api_url + '/' + method, body, {
        headers: this.getHeaders(),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        if (reject != null) {
          reject(err);
        }
      });
    });
  }

  /**
   * Performs a DELETE Request against the Hetzner API
   * @param {string} method
   * @returns {Promise<any>}
   * @private
   */
  _delete(method: string) {
    return new Promise((resolve, reject = null) => {
      this.http.delete(this.configService.api_url + '/' + method, {
        headers: this.getHeaders(),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        if (reject != null) {
          reject(err);
        }
      });
    });
  }

  /**
   * Build the needed HTTP Headers for the Hetzner API
   * @returns {HttpHeaders}
   */
  private getHeaders() {
    if (this.projectService.actual_project == null) {
      return new HttpHeaders();
    }
    return new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key)
      .set('Accept', 'application/json');
  }
}
