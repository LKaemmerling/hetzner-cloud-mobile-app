import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  /**
   *
   * @type {string}
   */
  public api_url: string = 'https://api.hetzner.cloud/v1';
}
