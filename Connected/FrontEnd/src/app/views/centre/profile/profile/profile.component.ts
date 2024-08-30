import { Component, OnInit } from '@angular/core'; // Import Angular core component
import { NgForm } from '@angular/forms'; // Import Angular forms module
import { HttpErrorResponse } from '@angular/common/http'; // Import HTTP error response
import { JwtHelperService } from '@auth0/angular-jwt'; // Import JWT helper for decoding tokens
import { ApiService } from 'src/app/services/crud/api.service'; // Import custom API service
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-profile', // Component selector
  templateUrl: './profile.component.html', // Path to the component's HTML template
  styleUrls: ['./profile.component.scss'] // Path to the component's stylesheet
})
export class ProfileComponent implements OnInit {

  profile: any; // User profile data
  img: any; // Profile image
  imagepath: any = 'http://localhost:3000/'; // Base path for image URLs
  old = ""; // Old password
  new = ""; // New password
  repe = ""; // Repeated new password
  errmessage: any; // Error message for profile update
  secmessage: any; // Success message for profile update
  errmessagepass: any; // Error message for password update
  secmessagepass: any; // Success message for password update

  helper = new JwtHelperService(); // JWT helper instance

  constructor(private api: ApiService, private route: Router) { }

  // Retrieve the ID from the decoded JWT token
  getId(): number {
    let token: any = localStorage.getItem('token');
    let decodedtoken: any = this.helper.decodeToken(token);
    return decodedtoken.id;
  }

  ngOnInit(): void {
    // Fetch and set the user profile data on initialization
    this.api.getcentre(this.getId()).subscribe(data => this.profile = data);
  }

  // Handle profile image update
  updateimage(event: any) {
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      const formData = new FormData();
      formData.append('img', path);
      this.api.updatecentreimage(formData, this.getId()).subscribe(() => this.ngOnInit());
    }
  }

  // Check if new password and repeated password match
  notthesame() {
    return this.new !== this.repe;
  }

  // Clear messages
  message() {
    this.errmessage = '';
    this.secmessage = '';
  }

  // Handle profile update
  update(f: NgForm) {
    let body = f.value;
    this.api.updatecentre(this.getId(), body).subscribe(() => {
      this.secmessage = "Mise à jour terminée avec succès";
      this.ngOnInit();
    }, (err: HttpErrorResponse) => {
      this.errmessage = err.error;
    });
  }

  // Handle password update
  updatepassword(f: NgForm) {
    let body = f.value;
    this.api.updatecentrepassword(body, this.getId()).subscribe(() => {
      this.route.navigate(['/centre/dashbord']);
    }, (err: HttpErrorResponse) => {
      this.errmessagepass = err.error;
      this.old = "";
    });
  }
}
