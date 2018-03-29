import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PricingServices} from "./PricingServices";

@NgModule({
  imports: [CommonModule],
  providers: [PricingServices]
})
export class PricingModule {

}
