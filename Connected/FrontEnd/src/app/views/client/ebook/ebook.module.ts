import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EbookRoutingModule } from './ebook-routing.module';
import { EbookComponent } from './ebook/ebook.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EbookComponent
  ],
  imports: [
    CommonModule,
    EbookRoutingModule,
    FormsModule
  ]
})
export class EbookModule { }
