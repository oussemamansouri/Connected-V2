import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipantsRoutingModule } from './participants-routing.module';
import { ParticipantsComponent } from './participants/participants.component';


@NgModule({
  declarations: [
    ParticipantsComponent
  ],
  imports: [
    CommonModule,
    ParticipantsRoutingModule,
    FormsModule
  ]
})
export class ParticipantsModule { }
