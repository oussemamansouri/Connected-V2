import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CetreDetailsRoutingModule } from './cetre-details-routing.module';
import { CetreDetailsComponent } from './cetre-details/cetre-details.component';


@NgModule({
  declarations: [
    CetreDetailsComponent
  ],
  imports: [
    CommonModule,
    CetreDetailsRoutingModule
  ]
})
export class CetreDetailsModule { }
