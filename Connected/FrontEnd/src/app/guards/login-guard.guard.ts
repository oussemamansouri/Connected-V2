import { AuthontificationService } from './../services/authontification/authontification.service'; // Importing the authentication service
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This guard is provided at the root level, making it available throughout the app
})
export class LoginGuardGuard implements CanActivate {
  
  // Injecting the authentication service and the router
  constructor(private auth: AuthontificationService, private router: Router) {}

  // Method that determines if a route can be activated
  canActivate(
    route: ActivatedRouteSnapshot, // Snapshot of the route at the moment of access
    state: RouterStateSnapshot // Snapshot of the router's state at the moment of access
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return new Promise((resolve, reject) => {

      // Check if the user is logged in as an admin
      if (this.auth.loginadmin() == true) {
        resolve(true); // If true, grant access to the route
      } else {
        this.router.navigate(['/login']); // If false, redirect to the login page
        localStorage.removeItem('token'); // Remove the authentication token from local storage
        resolve(false); // Deny access to the route
      }
    });
  }
}
