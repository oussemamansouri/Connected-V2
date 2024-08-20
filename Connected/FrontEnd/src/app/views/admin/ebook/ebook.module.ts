import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EbookRoutingModule } from './ebook-routing.module';
import { EbookComponent } from './ebook/ebook.component';


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
