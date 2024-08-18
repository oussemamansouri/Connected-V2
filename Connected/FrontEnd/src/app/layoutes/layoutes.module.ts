
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayouteComponent } from './admin-layoute/admin-layoute.component';
import { CentreLayouteComponent } from './centre-layoute/centre-layoute.component';
import { ClientLayouteComponent } from './client-layoute/client-layoute.component';
import { FrontLayouteComponent } from './front-layoute/front-layoute.component';
import { PnfLayouteComponent } from './pnf-layoute/pnf-layoute.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';






@NgModule({
  declarations: [
    AdminLayouteComponent,
    CentreLayouteComponent,
    ClientLayouteComponent,
    FrontLayouteComponent,
    PnfLayouteComponent,
    LoginComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule

  ]
})
export class LayoutesModule { }
