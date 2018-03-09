import {Component} from '@angular/core';
import {LoadingController, ModalController, NavController} from 'ionic-angular';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {ServerPage} from "../server";
import {addServerModal} from "../addServer/addServer";
import {ServerApiProvider} from "../../../providers/server-api/server-api";
import {ServersService} from "../../../models/servers/ServersService";
import {Storage} from "@ionic/storage";
import {TranslateService} from "@ngx-translate/core";
import {editServerModal} from "../editServer/editServer";
import {state, style, transition, trigger, useAnimation} from "@angular/animations";
import {fadeIn, fadeOut} from "ng-animate";

@Component({
  selector: 'page-servers',
  templateUrl: 'servers.html',
  animations: [
    trigger('animate', [
      state('active', style({
        display: 'block',
      })),
      state('*', style({
        display: 'none',
      })),
      transition('* => active', useAnimation(fadeIn, {params: {timing: 1, delay: 0}})),
      transition('active => *', useAnimation(fadeOut, {params: {timing: 0, delay: 0}}))])
  ],
})
export class ServersPage {

  public servers;
  public _search;
  public loading: boolean = false;
  public loading_done: boolean = false;
  public visible: Array<string> = [];
  public experimental_servers_design: boolean = false;

  constructor(public navCtrl: NavController, public project: ProjectsService, public serverApiProvider: ServerApiProvider, public modal: ModalController, public loadingCtrl: LoadingController, public serversService: ServersService, public storage: Storage, public translate: TranslateService) {
    this.servers = this._search = this.serversService.servers;
    storage.get('experimental_servers_design').then((val) => {
      if (val != undefined) {
        this.experimental_servers_design = val;
      }
    });
  }

  openSubMenu(menuId) {
    if (this.visible[menuId] != undefined && this.visible[menuId] == 'active') {
      this.visible = [];
    } else {
      this.visible = [];
      this.visible[menuId] = 'active';
    }

  }

  public loadServers() {
    this.loading = true;
    this.serversService.reloadServers().then(() => {
      this.servers = this.serversService.servers;
      this._search = this.servers;
      this.loading = false;
      this.loading_done = true;
      setTimeout(() => this.loading_done = false, 5000);
    });
  }

  public refresh(refresher = null) {

    this.loadServers();
    if (refresher !== null) {
      refresher.complete();
      ;
    }
  }

  public details(server) {
    this.navCtrl.push(ServerPage, {server: server});
  }

  public openEditModal(server) {
    let modal = this.modal.create(editServerModal, {server: server});
    modal.onDidDismiss(() => {
      this.loadServers();
    });

    modal.present();
  }


  public ionViewWillEnter() {
    this.serversService.reloadServers().then(() => {
      this.servers = this._search = this.serversService.servers;
    });
  }

  public delete(server) {
    let _delete: string = '';
    this.translate.get('ACTIONS.DELETE_CONFIRMATION').subscribe(text => {
      _delete = text;
    });
    if (confirm('Möchten Sie den Server ' + server.name + ' wirklich unwiderruflich löschen?')) {
      var loader = this.loadingCtrl.create();
      loader.present();
      this.serverApiProvider.delete(server.id).then((data) => {
        this.loadServers()
        loader.dismiss();
      });
    }
  }

  search(ev) {
    // Reset items back to all of the items
    this._search = this.servers;
// set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this._search = this.servers.filter((item) => {
        if (item == null) {
          return false;
        }
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  openCreateServerModal() {
    let modal = this.modal.create(addServerModal);
    modal.onDidDismiss(() => {
      this.loadServers();
    })

    modal.present();
  }
}
