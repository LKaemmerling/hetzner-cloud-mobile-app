import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ConfigService} from "../../hetzner-app/config/config.service";
import {AccountService} from "../../hetzner-robot-data/accounts/account.service";
import {HTTP} from "@ionic-native/http";
import {Observable} from "rxjs/Observable";

/**
 * This is the basic provider, that is the parent of all other api providers
 */
@Injectable()
export abstract class BaseApiProvider {
  /**
   * Constructor
   * @param {HttpClient} http
   * @param {AccountService} accountService
   * @param {ConfigService} configService
   */
  constructor(protected http: HTTP, protected angularHttp: HttpClient, protected accountService: AccountService, protected configService: ConfigService) {
  }

  /**
   * Performs a GET Request against the Hetzner API
   * @param {string} method
   * @returns {Promise<any>}
   * @private
   */
  _get(method: string) {
    return new Promise((resolve, reject = null) => {

      if (this.configService.runs_on_device) {
        this.http.get(this.configService.robot_api_url + '/' + method, null, this.getHeaders(),
        ).then(data => {
          resolve(Object.create(JSON.parse(data.data)));
        }).catch(err => {
          if (reject != null) {
            reject(this.parseErrorMessage(err));
          }
        });
      } else {
        this.angularHttp.get(this.configService.robot_api_url + '/' + method, {
          headers: this.getHeaders(),
        }).subscribe(data => {
          resolve(data);
        }, err => {
          if (reject != null) {
            reject(err);
          }
        });
      }
    });
  }

  /**
   * Performs a POST Request against the Hetzner API
   * @param {string} method
   * @param {object} body
   * @returns {Promise<any>}
   * @private
   */
  _post(method: string, body = null) {
    return new Promise((resolve, reject = null) => {
      if (this.configService.runs_on_device) {
        this.http.post(this.configService.robot_api_url + '/' + method, body, this.getHeaders(),
        ).then(data => {
          resolve(Object.create(JSON.parse(data.data)));
        }).catch(err => {
          if (reject != null) {
            reject(this.parseErrorMessage(err));
          }
        });
      } else {
        this.angularHttp.post(this.configService.robot_api_url + '/' + method, this.objToString(body), {
          headers: this.getHeaders(),
        }).subscribe(data => {
          resolve(data);
        }, err => {
          if (reject != null) {
            reject(err);
          }
        });
      }
    });
  }

  /**
   * Performs a PUT Request against the Hetzner API
   * @param {string} method
   * @param {object} body
   * @returns {Promise<any>}
   * @private
   */
  _put(method: string, body) {
    return new Promise((resolve, reject = null) => {
      if (this.configService.runs_on_device) {
        this.http.put(this.configService.robot_api_url + '/' + method, body, this.getHeaders(),
        ).then(data => {
          resolve(Object.create(JSON.parse(data.data)));
        }).catch(err => {
          if (reject != null) {
            reject(this.parseErrorMessage(err));
          }
        });
      } else {
        this.angularHttp.put(this.configService.robot_api_url + '/' + method, this.objToString(body), {
          headers: this.getHeaders(),
        }).subscribe(data => {
          resolve(data);
        }, err => {
          if (reject != null) {
            reject(err);
          }
        });
      }
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
      if (this.configService.runs_on_device) {
        this.http.delete(this.configService.robot_api_url + '/' + method, null, this.getHeaders(),
        ).then(data => {

          resolve(Object.create(JSON.parse(data.data)));
        }).catch(err => {
          if (reject != null) {
            reject(this.parseErrorMessage(err));
          }
        });
      } else {
        this.angularHttp.delete(this.configService.robot_api_url + '/' + method, {
          headers: this.getHeaders(),
        }).subscribe(data => {
          resolve(data);
        }, err => {
          if (reject != null) {
            reject(err);
          }
        });
      }
    });
  }

  /**
   * Build the needed HTTP Headers for the Hetzner API
   * @returns {HttpHeaders}
   */
  private getHeaders() {

    if (this.accountService.actual_account == null) {
      return {};
    }

    this.http.useBasicAuth(this.accountService.actual_account.username, this.accountService.actual_account.password);
    return {
      "Content-Type": "application/x-www-form-urlencoded",
      "App-Version": this.configService.version
    };
  }

  protected parseErrorMessage(error) {
    let _error = {message: ''};
    _error.message = error.error;
    return _error;
  }

  protected objToString(obj) {
    var str = '';
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        str += p + '=' + obj[p] + '&';
      }
    }
    return str.substr(0, str.length - 1);
  }
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public accountService: AccountService, protected configService: ConfigService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.accountService.actual_account != null) {
      if (request.url.indexOf('robot') != -1) {

        request = request.clone({
          setHeaders: {
            Authorization: "basic " + btoa(this.accountService.actual_account.username + ":" + this.accountService.actual_account.password)
          }
        });
      }
    }
    return next.handle(request);
  }
}
