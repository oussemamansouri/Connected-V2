import { ActivatedRoute, Router } from '@angular/router'; // Importing Router and ActivatedRoute for navigation and route handling
import { ApiService } from './../../../../services/crud/api.service'; // Importing custom service for API operations
import { NgForm } from '@angular/forms'; // Importing NgForm for handling forms
import { HttpErrorResponse } from '@angular/common/http'; // Importing HttpErrorResponse for error handling
import { JwtHelperService } from '@auth0/angular-jwt'; // Importing JwtHelperService for decoding JWT tokens
import { Component, OnInit } from '@angular/core'; // Importing necessary Angular components

@Component({
  selector: 'app-update-ebook', // Selector used to identify the component
  templateUrl: './update-ebook.component.html', // Template file for the component
  styleUrls: ['./update-ebook.component.scss'] // Stylesheet for the component
})
export class UpdateEbookComponent implements OnInit {

  ebook: any = {}; // Variable to hold the eBook data to be updated
  ebookid: any; // Variable to store the eBook ID obtained from the route parameters
  errmessage: any; // Variable to hold error messages during the update process
  book: any; // Variable to hold the selected eBook file
  helper = new JwtHelperService(); // Instance of JwtHelperService to decode JWT tokens

  constructor(private api: ApiService, private param: ActivatedRoute, private router: Router) { }

  convertDate(dateString: string): string {
    // Method to convert a date string to 'YYYY-MM-DD' format
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    // Method that runs when the component is initialized
    this.ebookid = this.param.snapshot.queryParams['ebookId']; // Getting the eBook ID from the route query parameters
    this.api.getebookbyid(this.ebookid).subscribe(data => { this.ebook = data }); // Fetching eBook details using the eBook ID
  }

  selectEbook(event: any) {
    // Method to handle the selection of an eBook file
    if (event.target.files.length > 0) {
      const path = event.target.files[0]; // Getting the selected file
      this.book = path; // Storing the file in the 'book' variable
    }
  }

  centreid() {
    // Method to get the centre ID from the JWT token
    let token: any = localStorage.getItem('token'); // Getting the token from local storage
    let decodedtoken: any = this.helper.decodeToken(token); // Decoding the token to extract information
    return decodedtoken.id; // Returning the centre ID
  }

  updateebook(f: NgForm) {
    // Method to update the eBook information
    let body = f.value; // Getting the form values
    const formData = new FormData();
    formData.append('titre', body.titre);
    formData.append('discription', body.discription);
    formData.append('book', this.book); // Appending the selected eBook file
    formData.append('nb_pages', body.nb_pages);
    formData.append('promotion', body.promotion);
    formData.append('prix', body.prix);
    formData.append('format', body.format);
    formData.append('auteur', body.auteur);
    formData.append('categorie', body.categorie);

    // Calling the API to update the eBook with the new data and handling the response
    this.api.updateebook(this.ebookid, formData).subscribe(
      info => this.router.navigate(['/admin/ebook']), // Navigating to the eBook list page on success
      (err: HttpErrorResponse) => this.errmessage = err.error // Setting error message if update fails
    );
  }

}
