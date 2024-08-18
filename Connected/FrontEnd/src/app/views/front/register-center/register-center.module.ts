import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterCenterRoutingModule } from './register-center-routing.module';
import { RegisterCenterComponent } from './register-center/register-center.component';


@NgModule({
  declarations: [
    RegisterCenterComponent
  ],
  imports: [
    CommonModule,
    RegisterCenterRoutingModule,
    FormsModule
  ]
})
export class RegisterCenterModule { }
