import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateEbookComponent } from './update-ebook/update-ebook.component';

const routes: Routes = [
  {path:'',component:UpdateEbookComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateEbookRoutingModule { }
