import {Injectable} from '@angular/core';
import {BaseApiProvider} from "../base-api/base-api";

/**
 * This is the provider that performs the api calls to the server api.
 */
@Injectable()
export class StorageBoxApiProvider extends BaseApiProvider {

  /**
   * Returns all existing Server objects
   * @see https://robot.your-server.de/doc/webservice/en.html#get-server
   * @param {string} searchTerm
   * @returns {Promise<any>}
   */
  getStorageBoxes() {
    return this._get('storagebox')
  }

  /**
   * Returns a specific Server object. The Server must exist inside the account
   * @see https://robot.your-server.de/doc/webservice/de.html#get-storagebox-storagebox-id
   * @param {number} boxId
   * @returns {Promise<any>}
   */
  getStorageBox(boxId: number) {
    return this._get('storagebox/' + boxId)
  }

  /**
   * @see https://robot.your-server.de/doc/webservice/de.html#post-storagebox-storagebox-id
   * @param {number} boxId
   * @param {string} name
   * @returns {Promise<any>}
   */
  update(boxId: number, name: string) {
    return this._post('storagebox/' + boxId, {storagebox_name: name});
  }

  snapshots(boxId: number) {
    return this._get('storagebox/' + boxId + '/snapshot')
  }

  createSnapshot(boxId: number) {
    return this._post('storagebox/' + boxId + '/snapshot')
  }

  deleteSnapshot(boxId: number, name: string) {
    return this._delete('storagebox/' + boxId + '/snapshot/' + name)
  }

  commentSnapshot(boxId: number, name: string, comment: string) {
    return this._post('storagebox/' + boxId + '/snapshot/' + name + '/comment', {comment: comment})
  }

  subaccounts(boxId: number) {
    return this._get('storagebox/' + boxId + '/subaccount')
  }

  createSubaccount(boxId: number, homedirectory: string, samba: boolean, webdav: boolean, readonly: boolean = false, comment: string = '') {
    return this._post('storagebox/' + boxId + '/subaccount', {
      homedirectory: homedirectory,
      samba: samba,
      webdav: webdav,
      readonly: readonly,
      comment: comment
    })
  }

  editSubaccount(boxId: number, userName: string, homedirectory: string, samba: boolean, webdav: boolean, readonly: boolean = false, comment: string = '') {
    return this._put('storagebox/' + boxId + '/subaccount/' + userName, {
      homedirectory: homedirectory,
      samba: samba,
      webdav: webdav,
      readonly: readonly,
      comment: comment
    })
  }

  deleteSubaccount(boxId: number, userName: string) {
    return this._delete('storagebox/' + boxId + '/subaccount/' + userName)
  }

  resetPasswordOnSubaccount(boxId: number, userName: string) {
    return this._post('storagebox/' + boxId + '/subaccount/' + userName + "/password")
  }
}
