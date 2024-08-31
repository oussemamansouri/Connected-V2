import { HttpErrorResponse } from '@angular/common/http'; // Importing HttpErrorResponse to handle errors related to HTTP requests
import { AuthontificationService } from './../../../../services/authontification/authontification.service'; // Importing the authentication service to handle user login and session management
import { Component, OnInit } from '@angular/core'; // Importing Component and OnInit from Angular core to define the component and lifecycle hook
import { ActivatedRoute, Router } from '@angular/router'; // Importing ActivatedRoute and Router to handle route navigation
import { JwtHelperService } from '@auth0/angular-jwt'; // Importing JwtHelperService to decode JWT tokens

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  token: any; // Variable to store the JWT token
  errmessage: any; // Variable to store any error messages
  data: any; // Variable to store response data from the login service
  helper = new JwtHelperService(); // Initializing the JwtHelperService to decode tokens

  // Constructor injects the authentication service, router, and activated route
  constructor(private auth: AuthontificationService, private route: Router, private act: ActivatedRoute) { }

  // Lifecycle hook that runs when the component is initialized
  ngOnInit(): void {
    // Check if the user is already logged in
    if (this.auth.logedin() == true) {
      this.token = localStorage.getItem('token'); // Retrieve the token from local storage
      let decodeToken = this.helper.decodeToken(this.token); // Decode the token to get user role
      // Navigate based on user role
      switch (decodeToken.role) {
        case 'admin':
          this.route.navigate(['/admin']);
          break;
        case 'client':
          this.route.navigate(['/client']);
          break;
        case 'centre':
          this.route.navigate(['/centre']);
          break;
        default:
          this.route.navigate(['/login']); // If role is not recognized, redirect to login
      }
    }
  }

  // Method to handle user login
  loginuser(f: any) {
    let body = f.value; // Get form values
    this.auth.login(body).subscribe(res => {
      this.data = res; // Store response data
      this.auth.savedata(this.data.token.token); // Save the token to local storage
      let decodeToken = this.helper.decodeToken(this.data.token.token); // Decode the token to get user role

      // Navigate based on user role
      switch (decodeToken.role) {
        case 'admin':
          this.route.navigate(['/admin']);
          break;
        case 'client':
          this.route.navigate(['/client']);
          break;
        case 'centre':
          this.route.navigate(['/centre']);
          break;
        default:
          this.route.navigate(['/login']); // If role is not recognized, redirect to login
      }

    }, (err: HttpErrorResponse) => this.errmessage = err.error); // Handle errors and store error message
  }

}
