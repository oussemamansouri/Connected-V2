import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjouteClientRoutingModule } from './ajoute-client-routing.module';
import { AjouteClientComponent } from './ajoute-client/ajoute-client.component';


@NgModule({
  declarations: [
    AjouteClientComponent
  ],
  imports: [
    CommonModule,
    AjouteClientRoutingModule,
    FormsModule
  ]
})
export class AjouteClientModule { }
