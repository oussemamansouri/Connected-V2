import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateCentreRoutingModule } from './update-centre-routing.module';
import { UpdateCentreComponent } from './update-centre/update-centre.component';


@NgModule({
  declarations: [
    UpdateCentreComponent
  ],
  imports: [
    CommonModule,
    UpdateCentreRoutingModule,
    FormsModule
  ]
})
export class UpdateCentreModule { }
