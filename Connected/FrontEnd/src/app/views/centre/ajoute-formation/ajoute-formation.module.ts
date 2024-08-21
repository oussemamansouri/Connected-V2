import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjouteFormationRoutingModule } from './ajoute-formation-routing.module';
import { AjouteFormationComponent } from './ajoute-formation/ajoute-formation.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AjouteFormationComponent
  ],
  imports: [
    CommonModule,
    AjouteFormationRoutingModule,
    FormsModule
  ]
})
export class AjouteFormationModule { }
