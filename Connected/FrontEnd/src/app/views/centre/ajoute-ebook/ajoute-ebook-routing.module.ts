import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouteEbookComponent } from './ajoute-ebook/ajoute-ebook.component';

const routes: Routes = [
  {path:'',component:AjouteEbookComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjouteEbookRoutingModule { }
