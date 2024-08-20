import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EbookComponent } from './ebook/ebook.component';

const routes: Routes = [
  {path:'',component:EbookComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EbookRoutingModule { }
