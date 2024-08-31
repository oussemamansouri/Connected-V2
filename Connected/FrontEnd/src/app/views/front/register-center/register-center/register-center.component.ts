import { HttpErrorResponse } from '@angular/common/http'; // Importing HttpErrorResponse to handle errors related to HTTP requests
import { Router } from '@angular/router'; // Importing Router to handle route navigation
import { ApiService } from './../../../../services/crud/api.service'; // Importing ApiService to make API calls for registering a center
import { NgForm } from '@angular/forms'; // Importing NgForm to work with Angular forms
import { Component, OnInit } from '@angular/core'; // Importing Component and OnInit from Angular core to define the component and lifecycle hook

@Component({
  selector: 'app-register-center',
  templateUrl: './register-center.component.html',
  styleUrls: ['./register-center.component.scss']
})
export class RegisterCenterComponent implements OnInit {
  errmessage: any; // Variable to store error messages

  // Constructor injects the API service and router
  constructor(private api: ApiService, private router: Router) { }

  // Lifecycle hook that runs when the component is initialized
  ngOnInit(): void {
    // Initialization logic can be added here if needed in the future
  }

  // Method to handle center registration
  registre(f: NgForm) {
    let body = f.value; // Get form values
    // Call the API service to register the center
    this.api.registrecentre(body).subscribe(
      info => this.router.navigate(['/login']), // On success, navigate to the login page
      (err: HttpErrorResponse) => this.errmessage = 'Ce email est déjà utilisé' // Handle errors and set error message if email is already used
    );
  }

}
