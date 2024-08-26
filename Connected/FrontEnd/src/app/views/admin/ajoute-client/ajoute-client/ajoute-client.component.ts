import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from './../../../../services/crud/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajoute-client',
  templateUrl: './ajoute-client.component.html',
  styleUrls: ['./ajoute-client.component.scss']
})
export class AjouteClientComponent implements OnInit {
  img: any; // Holds the selected image file
  cv: any;  // Holds the selected CV file
  errmessage: any; // Holds error messages

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  // Handles image file selection
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      this.img = path; // Assign the selected image file to img
    }
  }

  // Handles CV file selection
  selectCv(event: any) {
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      this.cv = path; // Assign the selected CV file to cv
    }
  }

  // Returns the current date in YYYY-MM-DD format
  maxDate() {
    const today = new Date().toISOString().split('T')[0];
    return today;
  }

  // Submits the form to add a new client
  addclient(f: NgForm) {
    let body = f.value; // Get form data
    const formData = new FormData();

    // Append form data to FormData object
    formData.append('firstname', body.firstname);
    formData.append('lastname', body.lastname);
    formData.append('img', this.img);
    formData.append('cv', this.cv);
    formData.append('email', body.email);
    formData.append('password', body.password);
    formData.append('portfolio', body.portfolio);
    formData.append('tel', body.tel);
    formData.append('facebook', body.facebook);
    formData.append('linkedin', body.linkedin);
    formData.append('instagram', body.instagram);
    formData.append('twitter', body.twitter);
    formData.append('address', body.address);
    formData.append('dob', body.dob);

    // Call the API service to register the client and navigate on success
    this.api.registreclient(formData).subscribe(
      info => this.router.navigate(['/admin/client']),
      (err: HttpErrorResponse) => this.errmessage = err.error // Handle error
    );
  }
}
