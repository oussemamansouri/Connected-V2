import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterClientComponent } from './register-client/register-client.component';

const routes: Routes = [
  {path:'',component:RegisterClientComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterClientRoutingModule { }
