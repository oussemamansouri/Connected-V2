import { Component, OnInit } from '@angular/core'; // Import Angular core component
import { Router } from '@angular/router'; // Import Router for navigation
import { ApiService } from './../../../../services/crud/api.service'; // Import custom API service
import { JwtHelperService } from '@auth0/angular-jwt'; // Import JwtHelperService for decoding JWT tokens

@Component({
  selector: 'app-ebook', // Component selector
  templateUrl: './ebook.component.html', // Path to the component's HTML template
  styleUrls: ['./ebook.component.scss'] // Path to the component's stylesheet
})
export class EbookComponent implements OnInit {
  searchTerm: any; // Search term for filtering eBooks
  ebooks: any; // List of eBooks
  imagepath: any = 'http://localhost:3000/'; // Base path for images
  ebookid: any; // ID of the selected eBook
  achat: any = []; // List of purchases for the selected eBook
  ebook: any = { // Data of the selected eBook
    id: '', titre: '', discription: '', auteur: '', format: '', nb_pages: '', img: '', prix: '', promotion: '', book: '', createdAt: '', updatedAt: '', CentreId: ''
  };
  hepler = new JwtHelperService(); // Instance of JwtHelperService

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    // Decode token and fetch eBooks for the centre
    let token: any = localStorage.getItem('token');
    let decodedtoken: any = this.hepler.decodeToken(token);
    let centreid = decodedtoken.id;
    this.api.getcentreebooks(centreid).subscribe(data => this.ebooks = data);
  }

  getbookId(id: any) {
    // Fetch eBook details and buyers
    this.ebookid = id;
    this.api.getebookbyid(id).subscribe(info => this.ebook = info);
    this.api.getbuyersebook(id).subscribe(data => this.achat = data);
  }

  downloadebook() {
    // Download eBook file
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
      a.remove(); // Remove the download link
    });
  }

  deleteebook() {
    // Delete the selected eBook and refresh the list
    this.api.deleteebook(this.ebookid).subscribe(() => this.ngOnInit());
  }

  sendid() {
    // Navigate to eBook update page with the eBook ID
    this.router.navigate(['/centre/ebook/update'], { queryParams: { ebookId: this.ebookid } });
  }

  sendebookid() {
    // Navigate to eBook purchases page with the eBook ID
    this.router.navigate(['/centre/ebook/buys'], { queryParams: { ebookId: this.ebookid } });
  }

  filter() {
    // Filter eBooks based on search term
    if (!this.searchTerm) {
      return this.ebooks;
    }
    return this.ebooks.filter((item: any) =>
      item.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
