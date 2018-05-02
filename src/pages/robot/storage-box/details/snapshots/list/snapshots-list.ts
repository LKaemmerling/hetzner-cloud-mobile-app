import {Component} from '@angular/core';
import {ActionSheetController, LoadingController, ModalController, NavParams} from 'ionic-angular';
import {fadeIn, fadeOut} from 'ng-animate';
import {StorageBoxApiProvider} from "../../../../../../modules/hetzner-robot-api/storage-box-api/storage-box-api";
import {TranslateService} from "@ngx-translate/core";
import {StorageBoxSnapshotEditModal} from "../edit/snapshot-edit";

/**
 * This is the project page, where you can create, activate, share and delete projects
 */
@Component({
  selector: 'page-snapshots-list',
  templateUrl: 'snapshots-list.html',
})
export class StorageBoxSnapshotsListPage {
  /**
   * All available servers
   * @type {any[]}
   */
  public storagebox: any;
  public snapshots: any;
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
   * All visible submenus
   * @type {any[]}
   */
  public visible: Array<string> = [];
  /**
   * Is the loading done?
   * @type {boolean}
   */
  public error: string = "";

  public success: string = "";

  /**
   * Contstructor
   * @param {NavParams} NavParams
   * @param {StorageBoxApiProvider} storageBoxApi
   * @param {LoadingController} loadingCtrl
   */
  constructor(
    protected NavParams: NavParams,
    protected storageBoxApi: StorageBoxApiProvider,
    protected loadingCtrl: LoadingController,
    protected actionCtrl: ActionSheetController,
    protected translateService: TranslateService,
    protected modalCtrl: ModalController
  ) {
    this.storagebox = this.NavParams.get('storage_box');

  }

  ngOnInit() {
    this.loadSnapshots();
  }

  loadSnapshots() {
    this.loading = true;
    this.storageBoxApi.snapshots(this.storagebox.id).then((val) => {
      this.loading = false;
      this.loading_done = true;
      this.snapshots = val;
      setTimeout(() => (this.loading_done = false), 5000);
    }, (error) => {
      this.loading = false;
      this.error = error.message;
    });
  }

  createNewSnapshot() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.storageBoxApi.createSnapshot(this.storagebox.id).then( () => {
      this.loadSnapshots();
      loader.dismiss();
    },(error) => {
      loader.dismiss();
      this.error = error.message;
    });


  }

  /**
   *
   */
  openActions(snapshot) {
    let _title: string = '';
    this.translateService
      .get('ROBOT.PAGE.SNAPSHOTS.LIST.ACTIONS.TITLE', {snapshot: (snapshot.comment != null && snapshot.comment.length > 0) ? (snapshot.comment + " (" + snapshot.name + ")") : snapshot.name})
      .subscribe(text => {
        _title = text;
      });
    let _delete: string = '';
    this.translateService.get('ACTIONS.DELETE').subscribe(text => {
      _delete = text;
    });
    let _edit: string = '';
    this.translateService.get('ACTIONS.EDIT').subscribe(text => {
      _edit = text;
    });
    let _cancel: string = '';
    this.translateService.get('ACTIONS.CANCEL').subscribe(text => {
      _cancel = text;
    });
    var buttons = [
      {
        text: _edit,
        icon: 'brush',
        handler: () => {
          let modal = this.modalCtrl.create(StorageBoxSnapshotEditModal, {
            storage_box: this.storagebox,
            snapshot: snapshot
          });
          modal.onDidDismiss(() => {
            this.loadSnapshots();
          });
          modal.present();
        },
      },

      {
        text: _delete,
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this._delete(snapshot);
        },
      },
      {
        text: _cancel,
        role: 'cancel', // will always sort to be on the bottom
        icon: 'close',
        handler: () => {
          console.log('Cancel clicked');
        },
      },
    ];
    var actions = {
      title: _title,
      cssClass: 'action-sheets-basic-page',
      buttons: buttons,
    };
    let actionSheet = this.actionCtrl.create(actions);
    actionSheet.present();
  }

  protected _delete(snapshot) {
    let confirmation = '';
    this.translateService.get('ACTIONS.DELETE_CONFIRMATION').subscribe(text => {
      confirmation = text;
    });
    if (confirm(confirmation)) {
      let loader = this.loadingCtrl.create();
      loader.present();
      this.storageBoxApi.deleteSnapshot(this.storagebox.id, snapshot.name).then(data => {
        this.loadSnapshots();
        let message = '';
        this.translateService.get('ROBOT.PAGE.SNAPSHOTS.LIST.MESSAGES.DELETE', {snapshot: (snapshot.comment != null && snapshot.comment.length > 0) ? (snapshot.comment + " (" + snapshot.name + ")") : snapshot.name}).subscribe(text => {
          message = text;
        });
        this.success = message;
        loader.dismiss();
        setTimeout(() => (this.success = ''), 10000);
      }, (error) => {
        loader.dismiss();
        this.loading = false;
        this.error = error.message;
      });
    }
  }

}
