import {Component} from '@angular/core';
import {ActionSheetController, ModalController, NavController, NavParams} from 'ionic-angular';
import {SshKeysApiProvider} from "../../../../modules/hetzner-robot-api/ssh-key-api/ssh-keys-api";
import {SshKeyEditModal} from "../edit/ssh-key-edit";
import {SshKeysService} from "../../../../modules/hetzner-robot-data/ssh-keys/ssh-keys.service";
import {NetworkProvider} from "../../../../modules/hetzner-app/network/network";
import {TranslateService} from "@ngx-translate/core";

/**
 * This page lists all ssh keys
 */

@Component({
  selector: 'page-ssh-key-list',
  templateUrl: 'ssh-key-list.html',
})
export class SshKeyListPage {
  /**
   * All available ssh keys
   * @type {any[]}
   */
  public _ssh_keys: Array<any> = [];
  /**
   * Is the component in the loading process?
   * @type {boolean}
   */
  public loading: boolean = false;
  /**
   * Is the loading done?
   * @type {boolean}
   */
  public loading_done: boolean = false;

  /**
   * Constructor
   * @param {ActionSheetController} actionSheetCtrl
   * @param {ModalController} modalCtrl
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {SshKeysService} sshKeysService
   * @param {TranslateService} translate
   * @param {SshKeyApiProvider} sshKeyProvider
   * @param {NetworkProvider} networkProvider
   */
  constructor(
    protected actionSheetCtrl: ActionSheetController,
    protected modalCtrl: ModalController,
    protected navCtrl: NavController,
    protected navParams: NavParams,
    protected sshKeysService: SshKeysService,
    protected translate: TranslateService,
    protected sshKeyProvider: SshKeysApiProvider,
    protected networkProvider: NetworkProvider) {
    this._ssh_keys = this.sshKeysService.ssh_keys;
  }

  /**
   * Load all ssh keys from the service
   */
  loadSSHKeys() {
    this.loading = true;
    this.sshKeysService.reloadSshKeys().then(() => {
      this._ssh_keys = this.sshKeysService.ssh_keys;
      this.loading = false;
      this.loading_done = true;
      setTimeout(() => this.loading_done = false, 3000);
    });
  }

  /**
   * Event fires when the view will be enterd
   */
  public ionViewWillEnter() {
    this.loadSSHKeys();
  }

  /**
   * Delete the given ssh key
   * @param ssh_key
   */
  public delete(ssh_key) {
    if (this.networkProvider.has_connection) {
      if (confirm('Möchten Sie diesen SSH-Key wirklich unwiderruflich löschen?')) {
        this.sshKeyProvider.delete(ssh_key.fingerprint).then((data) => {
          this.loadSSHKeys();
        });
      }
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Open the actions for the ssh key
   * @param ssh_key
   */
  public openActionSheets(ssh_key) {
    let _delete: string = '';
    this.translate.get('ACTIONS.DELETE').subscribe(text => {
      _delete = text;
    });
    let _edit: string = '';
    this.translate.get('ACTIONS.EDIT').subscribe(text => {
      _edit = text;
    });
    let _cancel: string = '';
    this.translate.get('ACTIONS.CANCEL').subscribe(text => {
      _cancel = text;
    });
    let _title: string = '';
    this.translate.get('ROBOT.PAGE.SSH_KEYS.ACTIONS.TITLE', {sshKey: ssh_key.name}).subscribe((text) => {
      _title = text;
    });

    var actions = {
      title: _title,
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: _delete,
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.delete(ssh_key);
          }
        },
        {
          text: _edit,
          icon: 'brush',
          handler: () => {
            if (this.networkProvider.has_connection) {
              this.modalCtrl.create(SshKeyEditModal, {ssh_key: ssh_key}).present();
            } else {
              this.networkProvider.displayNoNetworkNotice();
            }
          }
        },
        {
          text: _cancel,
          role: 'cancel', // will always sort to be on the bottom
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }
    let actionSheet = this.actionSheetCtrl.create(actions);
    actionSheet.present();
  }
}
