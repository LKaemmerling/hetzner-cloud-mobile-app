import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServersService} from "./ServersService";

@NgModule({
  imports: [CommonModule],
  providers: [ServersService]
})
export class ServersModule {

}
