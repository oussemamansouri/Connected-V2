import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateClientRoutingModule } from './update-client-routing.module';
import { UpdateClientComponent } from './update-client/update-client.component';


@NgModule({
  declarations: [
    UpdateClientComponent
  ],
  imports: [
    CommonModule,
    UpdateClientRoutingModule,
    FormsModule
  ]
})
export class UpdateClientModule { }
