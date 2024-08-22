import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbordRoutingModule } from './dashbord-routing.module';
import { DashbordComponent } from './dashbord/dashbord.component';


@NgModule({
  declarations: [
    DashbordComponent
  ],
  imports: [
    CommonModule,
    DashbordRoutingModule
  ]
})
export class DashbordModule { }
