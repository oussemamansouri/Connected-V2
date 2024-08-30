import { Component, OnInit } from '@angular/core'; // Import Angular core component
import { Router } from '@angular/router'; // Import Router for navigation
import { ApiService } from './../../../../services/crud/api.service'; // Import custom API service
import { JwtHelperService } from '@auth0/angular-jwt'; // Import JWT helper service

@Component({
  selector: 'app-ebook', // Component selector
  templateUrl: './ebook.component.html', // Path to the component's HTML template
  styleUrls: ['./ebook.component.scss'] // Path to the component's stylesheet
})
export class EbookComponent implements OnInit {

  searchTerm: any; // Search term for filtering ebooks
  ebooks: any; // List of ebooks
  imagepath: any = 'http://localhost:3000/'; // Path for images
  ebookid: any; // Current ebook ID
  clientid: any; // Current client ID
  achat: any = []; // List of purchases
  ebook: any = { id: '', titre: '', discription: '', auteur: '', format: '', nb_pages: '', img: '', prix: '', promotion: '', book: '', createdAt: '', updatedAt: '', CentreId: '' }; // Ebook details
  hepler = new JwtHelperService(); // JWT helper instance

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    // Get token and decode to retrieve client ID
    let token: any = localStorage.getItem('token');
    let decodedtoken: any = this.hepler.decodeToken(token);
    this.clientid = decodedtoken.id;

    // Fetch ebooks purchased by the client
    this.api.getclientachat(this.clientid).subscribe(data => this.ebooks = data);
  }

  // Retrieve ebook details and buyers based on ebook ID
  getbookId(id: any) {
    this.ebookid = id;
    this.api.getebookbyid(id).subscribe(info => this.ebook = info);
    this.api.getbuyersebook(id).subscribe(data => this.achat = data);
  }

  // Download ebook as a file
  downloadebook() {
    this.api.downloadebook(this.ebookid).subscribe((blob) => {
      const fileName = `Ebook.${this.ebook.format}`;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // Remove the element after download
    });
  }

  // Delete ebook purchase record for the client
  deleteachatclient() {
    this.api.deleteachatclient(this.clientid, this.ebookid).subscribe(info => this.ngOnInit());
  }

  // Filter ebooks based on search term
  filter() {
    if (!this.searchTerm) {
      // Return all ebooks if no search term
      return this.ebooks.map((item: any) => item.Ebook);
    }

    // Filter ebooks based on title
    return this.ebooks
      .filter((item: any) => item.Ebook.titre.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .map((item: any) => item.Ebook);
  }
}
