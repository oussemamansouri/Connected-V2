import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjouteCentreRoutingModule } from './ajoute-centre-routing.module';
import { AjouteCentreComponent } from './ajoute-centre/ajoute-centre.component';


@NgModule({
  declarations: [
    AjouteCentreComponent
  ],
  imports: [
    CommonModule,
    AjouteCentreRoutingModule,
    FormsModule
  ]
})
export class AjouteCentreModule { }
