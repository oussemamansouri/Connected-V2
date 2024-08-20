import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentreDeFormationRoutingModule } from './centre-de-formation-routing.module';
import { CentreDeFormationComponent } from './centre-de-formation/centre-de-formation.component';


@NgModule({
  declarations: [
    CentreDeFormationComponent
  ],
  imports: [
    CommonModule,
    CentreDeFormationRoutingModule,
    FormsModule
  ]
})
export class CentreDeFormationModule { }
