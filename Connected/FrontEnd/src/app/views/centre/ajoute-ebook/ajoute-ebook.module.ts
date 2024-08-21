import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjouteEbookRoutingModule } from './ajoute-ebook-routing.module';
import { AjouteEbookComponent } from './ajoute-ebook/ajoute-ebook.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AjouteEbookComponent
  ],
  imports: [
    CommonModule,
    AjouteEbookRoutingModule,
    FormsModule
  ]
})
export class AjouteEbookModule { }
