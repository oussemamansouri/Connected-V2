import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateFormationRoutingModule } from './update-formation-routing.module';
import { UpdateFormationComponent } from './update-formation/update-formation.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateFormationComponent
  ],
  imports: [
    CommonModule,
    UpdateFormationRoutingModule,
    FormsModule
  ]
})
export class UpdateFormationModule { }
