import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NetworkProvider} from "./network";
import {Network} from "@ionic-native/network";

@NgModule({
  imports: [CommonModule],
  providers: [Network, NetworkProvider]
})
export class NetworkModule {

}
