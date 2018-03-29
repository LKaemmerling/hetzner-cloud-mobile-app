import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  /**
   *
   * @type {string}
   */
  public api_url: string = 'https://api.hetzner.cloud/v1';
  /**
   *
   * @type {{appId: string; googleProjectId}}
   */
  public oneSignal = {
    appId: 'e8714cee-7480-45da-bad0-19ba3c3e89c4',
    googleProjectId: '1069973161280'
  }
}
