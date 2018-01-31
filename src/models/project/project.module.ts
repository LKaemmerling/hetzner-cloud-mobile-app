import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsService} from "./ProjectsService";

@NgModule({
  imports:      [ CommonModule ],
  providers:    [ ProjectsService ]
})
export class ProjectModule {

}
