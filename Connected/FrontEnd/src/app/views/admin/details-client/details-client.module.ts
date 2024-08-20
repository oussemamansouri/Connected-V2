import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsClientRoutingModule } from './details-client-routing.module';
import { DetailsClientComponent } from './details-client/details-client.component';


@NgModule({
  declarations: [
    DetailsClientComponent
  ],
  imports: [
    CommonModule,
    DetailsClientRoutingModule
  ]
})
export class DetailsClientModule { }
