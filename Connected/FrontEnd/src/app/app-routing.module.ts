
import { PnfLayouteComponent } from './layoutes/pnf-layoute/pnf-layoute.component';
import { FrontLayouteComponent } from './layoutes/front-layoute/front-layoute.component';
import { ClientLayouteComponent } from './layoutes/client-layoute/client-layoute.component';
import { CentreLayouteComponent } from './layoutes/centre-layoute/centre-layoute.component';
import { AdminLayouteComponent } from './layoutes/admin-layoute/admin-layoute.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layoutes/login/login.component';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { LoginCentreGuard } from './guards/login-centre.guard';
import { LoginClientGuard } from './guards/login-client.guard';


const routes: Routes = [

{path:'admin',component:AdminLayouteComponent,canActivate:[LoginGuardGuard],children:[
{path:'',redirectTo:'profile',pathMatch:'full'},
{path:'dashbord',loadChildren:()=>import('../app/views/admin/dashbord/dashbord.module').then(m=>m.DashbordModule)},
{path:'profile',loadChildren:()=>import('../app/views/admin/profile/profile.module').then(m=>m.ProfileModule)},
{path:'centre',loadChildren:()=>import('../app/views/admin/centre-de-formation/centre-de-formation.module').then(m=>m.CentreDeFormationModule)},
{path:'centre/details',loadChildren:()=>import('../app/views/admin/cetre-details/cetre-details.module').then(m=>m.CetreDetailsModule)},
{path:'centre/update',loadChildren:()=>import('../app/views/admin/update-centre/update-centre.module').then(m=>m.UpdateCentreModule)},
{path:'client',loadChildren:()=>import('../app/views/admin/client/client.module').then(m=>m.ClientModule)},
{path:'client/details',loadChildren:()=>import('../app/views/admin/details-client/details-client.module').then(m=>m.DetailsClientModule)},
{path:'client/update',loadChildren:()=>import('../app/views/admin/update-client/update-client.module').then(m=>m.UpdateClientModule)},
{path:'formation',loadChildren:()=>import('../app/views/admin/formation/formation.module').then(m=>m.FormationModule)},
{path:'ebook',loadChildren:()=>import('../app/views/admin/ebook/ebook.module').then(m=>m.EbookModule)},
{path:'centre/ajoute',loadChildren:()=>import('../app/views/admin/ajoute-centre/ajoute-centre.module').then(m=>m.AjouteCentreModule)},
{path:'client/ajoute',loadChildren:()=>import('../app/views/admin/ajoute-client/ajoute-client.module').then(m=>m.AjouteClientModule)},
{path:'ebook/update',loadChildren:()=>import('../app/views/admin/update-ebook/update-ebook.module').then(m=>m.UpdateEbookModule)},
{path:'formation/update',loadChildren:()=>import('../app/views/admin/update-formation/update-formation.module').then(m=>m.UpdateFormationModule)},
{path:'formation/participants',loadChildren:()=>import('../app/views/admin/participants/participants.module').then(m=>m.ParticipantsModule)},
{path:'ebook/buys',loadChildren:()=>import('../app/views/admin/buys-ebook/buys-ebook.module').then(m=>m.BuysEbookModule)},
]},
{path:'centre',component:CentreLayouteComponent,canActivate:[LoginCentreGuard],children:[
  {path:'',redirectTo:'profile',pathMatch:'full'},
  {path:'dashbord',loadChildren:()=>import('../app/views/centre/dashbord/dashbord.module').then(m=>m.DashbordModule)},
  {path:'profile',loadChildren:()=>import('../app/views/centre/profile/profile.module').then(m=>m.ProfileModule)},
  {path:'formation',loadChildren:()=>import('../app/views/centre/formation/formation.module').then(m=>m.FormationModule)},
  {path:'formation/ajoute',loadChildren:()=>import('../app/views/centre/ajoute-formation/ajoute-formation.module').then(m=>m.AjouteFormationModule)},
  {path:'formation/update',loadChildren:()=>import('../app/views/centre/update-formation/update-formation.module').then(m=>m.UpdateFormationModule)},
  {path:'formation/participants',loadChildren:()=>import('../app/views/centre/participants/participants.module').then(m=>m.ParticipantsModule)},
  {path:'client/details',loadChildren:()=>import('../app/views/centre/client-details/client-details.module').then(m=>m.ClientDetailsModule)},
  {path:'ebook',loadChildren:()=>import('../app/views/centre/ebook/ebook.module').then(m=>m.EbookModule)},
  {path:'ebook/ajoute',loadChildren:()=>import('../app/views/centre/ajoute-ebook/ajoute-ebook.module').then(m=>m.AjouteEbookModule)},
  {path:'ebook/update',loadChildren:()=>import('../app/views/centre/update-ebook/update-ebook.module').then(m=>m.UpdateEbookModule)},
  {path:'ebook/buys',loadChildren:()=>import('../app/views/centre/buys-ebook/buys-ebook.module').then(m=>m.BuysEbookModule)},
]},
{path:'client',component:ClientLayouteComponent,canActivate:[LoginClientGuard],children:[
  {path:'',redirectTo:'profile',pathMatch:'full'},
  {path:'profile',loadChildren:()=>import('../app/views/client/profile/profile.module').then(m=>m.ProfileModule)},
  {path:'formation',loadChildren:()=>import('../app/views/client/formation/formation.module').then(m=>m.FormationModule)},
  {path:'ebook',loadChildren:()=>import('../app/views/client/ebook/ebook.module').then(m=>m.EbookModule)},
]},
{path:'',component:FrontLayouteComponent,children:[
  {path:'',loadChildren:()=>import('../app/views/front/home/home.module').then(m=>m.HomeModule)},
  {path:'search',loadChildren:()=>import('../app/views/front/search/search.module').then(m=>m.SearchModule)},
  {path:'contact',loadChildren:()=>import('../app/views/front/contact/contact.module').then(m=>m.ContactModule)},
  {path:'about',loadChildren:()=>import('../app/views/front/about/about.module').then(m=>m.AboutModule)},
]},
{path:'login',component:LoginComponent,children:[
  {path:'',loadChildren:()=>import('../app/views/front/login/login.module').then(m=>m.LoginModule)},
  {path:'registre',loadChildren:()=>import('../app/views/front/registre/registre.module').then(m=>m.RegistreModule)},
  {path:'registre/client',loadChildren:()=>import('../app/views/front/register-client/register-client.module').then(m=>m.RegisterClientModule)},
  {path:'registre/centre',loadChildren:()=>import('../app/views/front/register-center/register-center.module').then(m=>m.RegisterCenterModule)},
]},
{path:'**',component:PnfLayouteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
