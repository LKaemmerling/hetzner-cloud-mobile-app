/**
 * The basic structure of every project
 */
export interface project {
  /**
   * The name of the project
   * @type {string}
   */
  name: string;
  /**
   * The api key of the project
   * @type {string}
   */
  api_key: string;
  /**
   * Is the API key revoked?
   */
  revoked: boolean;
  meta: any;

}
