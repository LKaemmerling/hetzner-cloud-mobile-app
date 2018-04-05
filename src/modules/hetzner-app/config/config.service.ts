import {Injectable} from '@angular/core';

/**
 * This service contain all configuration for the app, like the api_url or other tings.
 */
@Injectable()
export class ConfigService {
  /**
   * The basic url for the api calls
   * @type {string}
   */
  public api_url: string = 'https://api.hetzner.cloud/v1';
  /**
   * This contains all configuration for the One Signal Push Notification service
   * @type any
   */
  public oneSignal = {
    appId: 'e8714cee-7480-45da-bad0-19ba3c3e89c4',
    googleProjectId: '1069973161280'
  }
}
