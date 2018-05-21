/**
 * The basic structure of every project
 */
export interface Account {
  /**
   * The name of the project
   * @type {string}
   */
  name: string;
  /**
   * The username of the project
   * @type {string}
   */
  username: string;
  /**
   * The password of the account
   * @type {string}
   */
  password: string;

  /**
   * @type {boolean}
   */
  can_order: boolean;

  revoked: boolean;

}
