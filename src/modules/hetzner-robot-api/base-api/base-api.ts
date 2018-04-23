import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ProjectsService} from "../../hetzner-cloud-data/project/projects.service";
import {ConfigService} from "../../hetzner-app/config/config.service";
import {AccountService} from "../../hetzner-robot-data/accounts/account.service";
import {Observable} from "rxjs/Observable";

/**
 * This is the basic provider, that is the parent of all other api providers
 */
@Injectable()
export abstract class BaseApiProvider {
  /**
   * Constructor
   * @param {HttpClient} http
   * @param {ProjectsService} projectService
   * @param {ConfigService} configService
   */
  constructor(protected http: HttpClient, protected accountService: AccountService, protected configService: ConfigService) {
  }

  /**
   * Performs a GET Request against the Hetzner API
   * @param {string} method
   * @returns {Promise<any>}
   * @private
   */
  _get(method: string) {
    return new Promise((resolve, reject = null) => {
      this.http.get(this.configService.robot_api_url + '/' + method, {
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
      this.http.post(this.configService.robot_api_url + '/' + method, body, {
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
      this.http.put(this.configService.robot_api_url + '/' + method, body, {
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
      this.http.delete(this.configService.robot_api_url + '/' + method, {
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
    if (this.accountService.actual_account == null) {
      return new HttpHeaders();
    }
    return new HttpHeaders()
      .set("authorization", "basic " + btoa(this.accountService.actual_account.username + ":" + this.accountService.actual_account.password))
      .set("Content-Type", "application/x-www-form-urlencoded");
  }
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public accountService: AccountService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.indexOf('robot') != -1) {
      if (this.accountService.actual_account != null) {


        request = request.clone({
          setHeaders: {
            Authorization: "basic " + btoa(this.accountService.actual_account.username + ":" + this.accountService.actual_account.password),
            'Test-Header': 'Na_Super'
          }
        });
        return next.handle(request);
      }
      throw new Error('No account');
    } else {
      return next.handle(request);
    }

  }
}
