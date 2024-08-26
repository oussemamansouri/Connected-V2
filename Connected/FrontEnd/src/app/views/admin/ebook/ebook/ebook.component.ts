import { Router } from '@angular/router';
import { ApiService } from './../../../../services/crud/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ebook',
  templateUrl: './ebook.component.html',
  styleUrls: ['./ebook.component.scss']
})
export class EbookComponent implements OnInit {
  searchTerm: any;  // Holds the search term for filtering ebooks
  ebooks: any;      // Holds the list of all ebooks
  imagepath: any = 'http://localhost:3000/';  // Base URL for ebook images
  ebookid: any;     // Holds the ID of the currently selected ebook
  achat: any = [] ; // Holds the list of purchases for the selected ebook
  ebook: any = {
    id: '',
    titre: '',
    discription: '',
    auteur: '',
    format: '',
    nb_pages: '',
    img: '',
    prix: '',
    promotion: '',
    book: '',
    createdAt: '',
    updatedAt: '',
    CentreId: ''
  };  // Holds details of the selected ebook

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    // Fetch all ebooks when the component initializes
    this.api.getallbooks().subscribe(data => this.ebooks = data);
  }

  // Set the ID of the selected ebook and fetch its details and purchases
  getbookId(id: any) {
    this.ebookid = id;
    this.api.getebookbyid(id).subscribe(info => this.ebook = info);
    this.api.getbuyersebook(id).subscribe(data => this.achat = data);
  }

  // Download the selected ebook
  downloadebook() {
    this.api.downloadebook(this.ebookid).subscribe((blob) => {
      const fileName = `Ebook.${this.ebook.format}`;  // File name for the downloaded ebook
      const url = window.URL.createObjectURL(blob);  // Create a URL for the blob
      const a = document.createElement('a');  // Create a link element
      document.body.appendChild(a);  // Append link to the body
      a.setAttribute('style', 'display: none');  // Hide the link
      a.href = url;  // Set the URL as the link href
      a.download = fileName;  // Set the file name for the download
      a.click();  // Trigger the download
      window.URL.revokeObjectURL(url);  // Clean up the URL object
      a.remove(); // Remove the link element
    });
  }

  // Delete the selected ebook
  deleteebook() {
    this.api.deleteebook(this.ebookid).subscribe(() => this.ngOnInit());  // Refresh the list after deletion
  }

  // Navigate to the ebook update page with the selected ebook ID
  sendid() {
    this.router.navigate(['/admin/ebook/update'], { queryParams: { ebookId: this.ebookid } });
  }

  // Navigate to the ebook purchases page with the selected ebook ID
  sendebookid() {
    this.router.navigate(['/admin/ebook/buys'], { queryParams: { ebookId: this.ebookid } });
  }

  // Filter ebooks based on the search term
  filter() {
    if (!this.searchTerm) {
      return this.ebooks;  // Return all ebooks if no search term is provided
    }

    return this.ebooks.filter((item: any) =>
      item.titre.toLowerCase().includes(this.searchTerm.toLowerCase())  // Filter ebooks by title
    );
  }
}
