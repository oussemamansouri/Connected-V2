import { AuthontificationService } from './../services/authontification/authontification.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(private auth:AuthontificationService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve,reject)=>{

      if(this.auth.loginadmin()==true){

        resolve(true)}
      else{
        this.router.navigate(['/login']) //,{queryParams:{backUrl:state.url}}
        localStorage.removeItem('token')
        resolve(false)
      }
    })
  }

}
