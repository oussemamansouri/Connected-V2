import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthontificationService } from './../services/authontification/authontification.service';

@Injectable({
  providedIn: 'root'
})
export class LoginClientGuard implements CanActivate {

  constructor(private auth:AuthontificationService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve,reject)=>{

        if(this.auth.loginclient()==true){ resolve(true)}
        else{
          this.router.navigate(['/login']) //,{queryParams:{backUrl:state.url}}
          localStorage.removeItem('token')
          resolve(false)
        }
      })
  }

}
