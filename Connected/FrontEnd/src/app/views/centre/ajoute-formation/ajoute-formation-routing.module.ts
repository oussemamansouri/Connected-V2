import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouteFormationComponent } from './ajoute-formation/ajoute-formation.component';

const routes: Routes = [
  {path:'',component:AjouteFormationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjouteFormationRoutingModule { }
