import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuysEbookRoutingModule } from './buys-ebook-routing.module';
import { BuysEbookComponent } from './buys-ebook/buys-ebook.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BuysEbookComponent
  ],
  imports: [
    CommonModule,
    BuysEbookRoutingModule,
    FormsModule
  ]
})
export class BuysEbookModule { }
