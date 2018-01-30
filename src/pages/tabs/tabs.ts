import { Component } from '@angular/core';


import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {ServersPage} from "../servers/servers";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ServersPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
