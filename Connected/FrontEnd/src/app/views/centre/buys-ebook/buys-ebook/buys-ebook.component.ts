import { Component, OnInit } from '@angular/core'; // Import Angular core component
import { ApiService } from './../../../../services/crud/api.service'; // Import custom API service
import { Router, ActivatedRoute } from '@angular/router'; // Import Router and ActivatedRoute for navigation and route parameters

@Component({
  selector: 'app-buys-ebook', // Component selector
  templateUrl: './buys-ebook.component.html', // Path to the component's HTML template
  styleUrls: ['./buys-ebook.component.scss'] // Path to the component's stylesheet
})
export class BuysEbookComponent implements OnInit {
  clients: any; // List of clients who bought the eBook
  clientid: any; // ID of the selected client
  ebookid: any; // ID of the eBook
  searchTerm: any; // Term used for filtering clients

  constructor(private router: Router, private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Retrieve the eBook ID from the query parameters and fetch buyer data
    this.ebookid = this.route.snapshot.queryParams['ebookId'];
    this.api.getbuyersebook(this.ebookid).subscribe(data => this.clients = data);
  }

  sendId(id: any) {
    // Navigate to the client details page with the selected client ID
    this.router.navigate(['/centre/client/details'], { queryParams: { clientId: id } });
  }

  getclientid(id: any) {
    // Set the selected client ID
    this.clientid = id;
  }

  deleteachat() {
    // Delete the purchase record and refresh the data
    this.api.deleteachat(this.clientid, this.ebookid).subscribe(() => this.ngOnInit());
  }

  filter() {
    // Filter clients based on the search term
    if (!this.searchTerm) {
      return this.clients.rows;
    }

    return this.clients.rows.filter((client: any) => {
      const firstNameMatch = client.Client.firstname.toLowerCase().includes(this.searchTerm.toLowerCase());
      const lastNameMatch = client.Client.lastname.toLowerCase().includes(this.searchTerm.toLowerCase());
      return firstNameMatch || lastNameMatch;
    });
  }
}
