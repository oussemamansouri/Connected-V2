import { Component, OnInit } from '@angular/core'; // Import Angular core component
import { NgForm } from '@angular/forms'; // Import Angular form handling
import { HttpErrorResponse } from '@angular/common/http'; // Import error handling
import { JwtHelperService } from '@auth0/angular-jwt'; // Import JWT helper service
import { ApiService } from 'src/app/services/crud/api.service'; // Import custom API service
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-profile', // Component selector
  templateUrl: './profile.component.html', // Path to the component's HTML template
  styleUrls: ['./profile.component.scss'] // Path to the component's stylesheet
})
export class ProfileComponent implements OnInit {

  profile: any; // User profile details
  img: any; // Image file for profile picture
  cv: any; // CV file
  imagepath: any = 'http://localhost:3000/'; // Path for images
  old: string = ""; // Old password for password update
  new: string = ""; // New password for password update
  repe: string = ""; // Password repetition for confirmation
  errmessage: any; // Error message for general update issues
  secmessage: any; // Success message for successful updates
  errmessagepass: any; // Error message for password update issues
  secmessagepass: any; // Success message for password update

  helper = new JwtHelperService(); // JWT helper instance

  constructor(private api: ApiService, private route: Router) { }

  // Retrieve client ID from the JWT token
  getId(): number {
    let token: any = localStorage.getItem('token');
    let decodedtoken: any = this.helper.decodeToken(token);
    return decodedtoken.id;
  }

  ngOnInit(): void {
    // Fetch the client profile details on initialization
    this.api.getclient(this.getId()).subscribe(data => this.profile = data);
  }

  // Update profile image
  updateimage(event: any) {
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      const formData = new FormData();
      formData.append('img', path);
      this.api.updateclientimage(formData, this.getId()).subscribe(info => this.ngOnInit());
    }
  }

  // Update CV
  updatecv(event: any) {
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      const formData = new FormData();
      formData.append('cv', path);
      this.api.updatecv(formData, this.getId()).subscribe(info => this.ngOnInit());
    }
  }

  // Check if the new password and its repetition match
  notthesame() {
    return this.new !== this.repe;
  }

  // Clear error and success messages
  message() {
    this.errmessage = '';
    this.secmessage = '';
  }

  // Get today's date for form validations
  maxDate() {
    const today = new Date().toISOString().split('T')[0];
    return today;
  }

  // Update profile details
  update(f: NgForm) {
    let body = f.value;
    this.api.updateclient(this.getId(), body).subscribe(info => {
      this.secmessage = "Mise à jour terminée avec succès";
      this.ngOnInit();
    }, (err: HttpErrorResponse) => {
      this.errmessage = err.error;
    });
  }

  // Update client password
  updatepassword(f: NgForm) {
    let body = f.value;
    this.api.updateclientpassword(body, this.getId()).subscribe(info => {
      this.route.navigate(['/']);
    }, (err: HttpErrorResponse) => {
      this.errmessagepass = err.error;
      this.old = "";
    });
  }

}
