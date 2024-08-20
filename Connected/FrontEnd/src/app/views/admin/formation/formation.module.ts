import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormationRoutingModule } from './formation-routing.module';
import { FormationComponent } from './formation/formation.component';


@NgModule({
  declarations: [
    FormationComponent
  ],
  imports: [
    CommonModule,
    FormationRoutingModule,
    FormsModule
  ]
})
export class FormationModule { }
