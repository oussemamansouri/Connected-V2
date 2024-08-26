import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from './../../../../services/crud/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajoute-centre',
  templateUrl: './ajoute-centre.component.html',
  styleUrls: ['./ajoute-centre.component.scss']
})
export class AjouteCentreComponent implements OnInit {
  img: any; // Holds the selected image file
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

  // Submits the form to add a new centre
  addcentre(f: NgForm) {
    let body = f.value; // Get form data
    const formData = new FormData();

    // Append form data to FormData object
    formData.append('name', body.name);
    formData.append('email', body.email);
    formData.append('img', this.img);
    formData.append('password', body.password);
    formData.append('tel', body.tel);
    formData.append('site', body.site);
    formData.append('services', body.services);
    formData.append('fiscale', body.fiscale);
    formData.append('license', body.license);
    formData.append('nom_manager', body.nom_manager);
    formData.append('prenom_manager', body.prenom_manager);
    formData.append('tel_manager', body.tel_manager);
    formData.append('localisation', body.localisation);
    formData.append('facebook', body.facebook);
    formData.append('linkedin', body.linkedin);
    formData.append('instagram', body.instagram);
    formData.append('twitter', body.twitter);

    // Call the API service to register the centre and navigate on success
    this.api.registrecentre(formData).subscribe(
      info => this.router.navigate(['/admin/centre']),
      (err: HttpErrorResponse) => this.errmessage = 'Ce email est déjà utilisé' // Handle error
    );
  }
}
