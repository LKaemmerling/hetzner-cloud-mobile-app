import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServerStatusIndicatorComponent} from './server-status-indicator/server-status-indicator';
import {LoadingIndicatorComponent} from './loading-indicator/loading-indicator';
import {IonicModule} from "ionic-angular";
import {ServerBasicInformationComponent} from './server-basic-information/server-basic-information';
import {NumericStepIndicatorComponent} from './numeric-step-indicator/numeric-step-indicator';
import {TranslateModule} from "@ngx-translate/core";
import {SelectBoxComponent} from './select-box/select-box';
import {SelectOnlyOneBoxComponent} from './select-only-one-box/select-only-one-box';
import {SelectDatacenterComponent} from './server-creation/select-datacenter/select-datacenter';
import {SelectImageComponent} from "./server-creation/select-image/select-image";
import {SelectTypeComponent} from "./server-creation/select-type/select-type";
import {SelectSshKeyComponent} from "./server-creation/select-ssh-keys/select-ssh-keys";

@NgModule({
  declarations: [
    ServerStatusIndicatorComponent,
    LoadingIndicatorComponent,
    ServerBasicInformationComponent,
    NumericStepIndicatorComponent,
    SelectBoxComponent,
    SelectOnlyOneBoxComponent,
    SelectDatacenterComponent,
    SelectImageComponent,
    SelectTypeComponent,
    SelectSshKeyComponent
  ],
  imports: [CommonModule, IonicModule, TranslateModule],
  exports: [
    ServerStatusIndicatorComponent,
    LoadingIndicatorComponent,
    ServerBasicInformationComponent,
    NumericStepIndicatorComponent,
    SelectBoxComponent,
    SelectOnlyOneBoxComponent,
    SelectDatacenterComponent,
    SelectImageComponent,
    SelectTypeComponent,
    SelectSshKeyComponent
  ]
})
export class ComponentsModule {
}
