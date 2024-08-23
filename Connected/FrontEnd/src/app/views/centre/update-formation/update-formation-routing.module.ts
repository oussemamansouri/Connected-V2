import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateFormationComponent } from './update-formation/update-formation.component';

const routes: Routes = [
  {path:'',component:UpdateFormationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateFormationRoutingModule { }
