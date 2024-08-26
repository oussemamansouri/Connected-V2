import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthontificationService } from '../services/authontification/authontification.service'; // Service for handling authentication

@Injectable({
  providedIn: 'root' // This makes the guard available throughout the application
})
export class LoginCentreGuard implements CanActivate {

  // Inject the authentication service and router for navigation
  constructor(private auth: AuthontificationService, private router: Router) {}

  // Method that determines if a route can be activated
  canActivate(
    route: ActivatedRouteSnapshot, // Contains information about the route being accessed
    state: RouterStateSnapshot // Contains the state of the router at the time of navigation
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {

      // Check if the user is logged in as a center
      if (this.auth.logincentre() == true) {
        resolve(true); // Allow access to the route
      } else {
        this.router.navigate(['/login']); // Redirect to the login page if not logged in
        localStorage.removeItem('token'); // Remove the token from local storage
        resolve(false); // Deny access to the route
      }
    });
  }
}
