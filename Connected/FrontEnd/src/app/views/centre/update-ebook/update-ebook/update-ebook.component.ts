import { Component, OnInit } from '@angular/core'; // Import Angular core component
import { ActivatedRoute, Router } from '@angular/router'; // Import Router and ActivatedRoute for navigation and route parameters
import { ApiService } from './../../../../services/crud/api.service'; // Import custom API service
import { NgForm } from '@angular/forms'; // Import Angular forms module
import { HttpErrorResponse } from '@angular/common/http'; // Import HTTP error response
import { JwtHelperService } from '@auth0/angular-jwt'; // Import JWT helper for decoding tokens

@Component({
  selector: 'app-update-ebook', // Component selector
  templateUrl: './update-ebook.component.html', // Path to the component's HTML template
  styleUrls: ['./update-ebook.component.scss'] // Path to the component's stylesheet
})
export class UpdateEbookComponent implements OnInit {
  ebook: any = {}; // Ebook details
  ebookid: any; // Ebook ID
  errmessage: any; // Error message
  book: any; // File object for the ebook
  helper = new JwtHelperService(); // JWT helper instance

  constructor(private api: ApiService, private param: ActivatedRoute, private router: Router) { }

  // Convert date string to YYYY-MM-DD format
  convertDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    // Retrieve the ebook ID from query parameters and fetch ebook details
    this.ebookid = this.param.snapshot.queryParams['ebookId'];
    this.api.getebookbyid(this.ebookid).subscribe(data => {
      this.ebook = data;
    });
  }

  // Handle file selection for ebook
  selectEbook(event: any) {
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      this.book = path;
    }
  }

  // Retrieve the centre ID from the decoded JWT token
  centreid() {
    let token: any = localStorage.getItem('token');
    let decodedtoken: any = this.helper.decodeToken(token);
    return decodedtoken.id;
  }

  // Handle ebook update
  updateebook(f: NgForm) {
    let body = f.value;
    const formData = new FormData();
    formData.append('titre', body.titre);
    formData.append('discription', body.discription);
    formData.append('book', this.book);
    formData.append('nb_pages', body.nb_pages);
    formData.append('promotion', body.promotion);
    formData.append('prix', body.prix);
    formData.append('format', body.format);
    formData.append('auteur', body.auteur);
    formData.append('categorie', body.categorie);

    // Send updated ebook data to the server and navigate on success
    this.api.updateebook(this.ebookid, formData).subscribe(
      info => this.router.navigate(['/centre/ebook']),
      (err: HttpErrorResponse) => this.errmessage = err.error
    );
  }
}
