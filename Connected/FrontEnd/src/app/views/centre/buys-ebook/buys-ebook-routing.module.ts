import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { combineLatest } from 'rxjs';
import { BuysEbookComponent } from './buys-ebook/buys-ebook.component';

const routes: Routes = [
  {path:'',component:BuysEbookComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuysEbookRoutingModule { }
