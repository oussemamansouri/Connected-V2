import { Router } from '@angular/router'; // Importing Router to handle route navigation
import { ApiService } from './../../../../services/crud/api.service'; // Importing ApiService to make API calls for registering a client
import { NgForm } from '@angular/forms'; // Importing NgForm to work with Angular forms
import { Component, OnInit } from '@angular/core'; // Importing Component and OnInit from Angular core to define the component and lifecycle hook

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.scss']
})
export class RegisterClientComponent implements OnInit {
  errormessage: any; // Variable to store error messages

  // Constructor injects the API service and router
  constructor(private api: ApiService, private router: Router) { }

  // Lifecycle hook that runs when the component is initialized
  ngOnInit(): void {
    // Initialization logic can be added here if needed in the future
  }

  // Method to get the maximum date (current date) for the date of birth input
  maxDate() {
    const today = new Date().toISOString().split('T')[0]; // Get the current date in 'YYYY-MM-DD' format
    return today; // Return the current date as the maximum date
  }

  // Method to handle client registration
  register(f: NgForm) {
    let body = new FormData(); // Creating a new FormData object to hold form values
    body.append('firstname', f.value.firstname); // Append the 'firstname' field to FormData
    body.append('lastname', f.value.lastname); // Append the 'lastname' field to FormData
    body.append('email', f.value.email); // Append the 'email' field to FormData
    body.append('tel', f.value.tel); // Append the 'tel' field to FormData
    body.append('address', f.value.address); // Append the 'address' field to FormData
    body.append('dob', f.value.dob); // Append the 'dob' (date of birth) field to FormData
    body.append('password', f.value.password); // Append the 'password' field to FormData

    // Call the API service to register the client
    this.api.registreclient(body)
      .subscribe(
        response => this.router.navigate(['/login']), // On success, navigate to the login page
        (err) => {
          this.errormessage = 'Ce email est déjà utilisé'; // Handle errors and set error message if email is already used
        }
      );
  }
}
