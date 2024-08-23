import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateEbookRoutingModule } from './update-ebook-routing.module';
import { UpdateEbookComponent } from './update-ebook/update-ebook.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateEbookComponent
  ],
  imports: [
    CommonModule,
    UpdateEbookRoutingModule,
    FormsModule
  ]
})
export class UpdateEbookModule { }
