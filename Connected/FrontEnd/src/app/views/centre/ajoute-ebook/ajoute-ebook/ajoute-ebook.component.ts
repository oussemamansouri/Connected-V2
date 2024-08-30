import { Component, OnInit } from '@angular/core'; // Importing Angular core component
import { HttpErrorResponse } from '@angular/common/http'; // Importing HttpErrorResponse for handling errors
import { Router } from '@angular/router'; // Importing Router for navigation
import { NgForm } from '@angular/forms'; // Importing NgForm for form handling
import { ApiService } from './../../../../services/crud/api.service'; // Importing custom API service
import { JwtHelperService } from '@auth0/angular-jwt'; // Importing JwtHelperService for token decoding

@Component({
  selector: 'app-ajoute-ebook', // Selector for identifying the component
  templateUrl: './ajoute-ebook.component.html', // Path to the HTML template file
  styleUrls: ['./ajoute-ebook.component.scss'] // Path to the stylesheet file
})
export class AjouteEbookComponent implements OnInit {
  img: any; // Variable to hold the selected image file
  ebook: any; // Variable to hold the selected ebook file
  errmessage: any; // Variable to hold error messages
  helper = new JwtHelperService(); // JWT helper for decoding tokens

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    // Lifecycle hook called after the component is initialized
  }

  selectImage(event: any) {
    // Method to handle image file selection
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      this.img = path; // Assign selected image file to `img` variable
    }
  }

  selectEbook(event: any) {
    // Method to handle ebook file selection
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      this.ebook = path; // Assign selected ebook file to `ebook` variable
    }
  }

  centreid() {
    // Method to get the centre ID from the decoded JWT token
    let token: any = localStorage.getItem('token'); // Retrieve token from local storage
    let decodedtoken: any = this.helper.decodeToken(token); // Decode the token
    return decodedtoken.id; // Return the centre ID from the decoded token
  }

  addebook(f: NgForm) {
    // Method to handle ebook addition
    let body = f.value; // Get form values
    const formData = new FormData();
    formData.append('titre', body.titre); // Append form values to FormData
    formData.append('discription', body.discription);
    formData.append('img', this.img);
    formData.append('book', this.ebook);
    formData.append('nb_pages', body.nb_pages);
    formData.append('promotion', body.promotion);
    formData.append('prix', body.prix);
    formData.append('categorie', body.categorie);
    formData.append('format', body.format);
    formData.append('auteur', body.auteur);

    // Call API to add ebook and handle response
    this.api.addebookbycentre(formData, this.centreid()).subscribe(
      info => this.router.navigate(['/centre/ebook']), // Navigate to ebook list on success
      (err: HttpErrorResponse) => this.errmessage = err.error // Set error message on failure
    );
  }
}
