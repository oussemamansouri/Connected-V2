import { Router } from '@angular/router'; // Importing Angular's Router for navigation
import { JwtHelperService } from '@auth0/angular-jwt'; // Importing JwtHelperService for decoding JWT tokens
import { ApiService } from './../../../../services/crud/api.service'; // Importing custom service for API operations
import { Component, OnInit } from '@angular/core'; // Importing necessary Angular components
import { NgForm } from '@angular/forms'; // Importing NgForm for handling forms
import { HttpErrorResponse } from '@angular/common/http'; // Importing HttpErrorResponse for error handling

@Component({
  selector: 'app-profile', // Selector used to identify the component
  templateUrl: './profile.component.html', // Template file for the component
  styleUrls: ['./profile.component.scss'] // Stylesheet for the component
})
export class ProfileComponent implements OnInit {

  profile: any; // Variable to hold the profile data of the admin user
  img: any; // Variable to hold the selected image file for upload
  imagepath: any = 'http://localhost:3000/'; // Base path for image URLs
  old = ""; // Variable to hold the old password input by the user
  new = ""; // Variable to hold the new password input by the user
  repe = ""; // Variable to hold the password confirmation input by the user
  errmessage: any; // Variable to hold error messages for profile update
  secmessage: any; // Variable to hold success messages for profile update
  errmessagepass: any; // Variable to hold error messages for password update
  secmessagepass: any; // Variable to hold success messages for password update

  helper = new JwtHelperService(); // Instance of JwtHelperService to decode JWT tokens

  constructor(private api: ApiService, private route: Router) {}

  ngOnInit(): void {
    // Method that runs when the component is initialized
    this.api.getadmin().subscribe(data => this.profile = data); // Fetching admin profile data
  }

  notthesame() {
    // Method to check if the new password and repeated password are not the same
    return this.new !== this.repe; // Returns true if passwords don't match, otherwise false
  }

  updateimage(event: any) {
    // Method to handle image upload and update
    if (event.target.files.length > 0) {
      const path = event.target.files[0]; // Getting the selected image file
      const formData = new FormData();
      formData.append('img', path); // Appending the image file to the form data
      this.api.updateaadminimage(formData, this.getId()).subscribe(info => this.ngOnInit()); // Uploading the image and refreshing the profile data
    }
  }

  getId(): number {
    // Method to get the admin user ID from the JWT token
    let token: any = localStorage.getItem('token'); // Getting the token from local storage
    let decodedtoken: any = this.helper.decodeToken(token); // Decoding the token to extract user information
    return decodedtoken.id; // Returning the user ID
  }

  update(f: NgForm) {
    // Method to update the admin profile
    let body = f.value; // Getting the form values
    this.api.updateadmin(body, this.getId()).subscribe(info => {
      console.log(info);
      this.api.getadmin().subscribe(data => {
        this.secmessage = "Mise à jour terminée avec succès"; // Setting success message
        this.ngOnInit(); // Refreshing the profile data
      });
    }, (err: HttpErrorResponse) => {
      this.errmessage = err.error; // Setting error message if update fails
    });
  }

  message() {
    // Method to clear messages
    this.errmessage = ''; // Clearing error message for profile update
    this.secmessage = ''; // Clearing success message for profile update
  }

  updatepassword(f: NgForm) {
    // Method to update the admin password
    let body = f.value; // Getting the form values
    this.api.updatepassword(body, this.getId()).subscribe(info => {
      this.route.navigate(['/admin/dashbord']); // Navigating to dashboard on successful password update
    }, (err: HttpErrorResponse) => {
      this.errmessagepass = err.error; // Setting error message if password update fails
      this.old = ""; // Clearing the old password input
    });
  }
}
