import { ApiService } from './../../../../services/crud/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buys-ebook',
  templateUrl: './buys-ebook.component.html',
  styleUrls: ['./buys-ebook.component.scss']
})
export class BuysEbookComponent implements OnInit {
  clients: any;  // Stores the list of clients who bought the eBook
  clientid: any; // Stores the ID of the selected client
  ebookid: any;  // Stores the ID of the eBook
  searchTerm: any; // Stores the search term for filtering clients

  constructor(private router: Router, private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Retrieve the eBook ID from the query parameters
    this.ebookid = this.route.snapshot.queryParams['ebookId'];
    
    // Fetch clients who bought the eBook and assign them to the clients property
    this.api.getbuyersebook(this.ebookid).subscribe(data => this.clients = data);
  }

  // Navigate to client details page with the selected client's ID
  sendId(id: any) {
    this.router.navigate(['/admin/client/details'], { queryParams: { clientId: id } });
  }

  // Set the client ID for the selected client
  getclientid(id: any) {
    this.clientid = id;
  }

  // Delete the purchase record for the selected client and eBook
  deleteachat() {
    this.api.deleteachat(this.clientid, this.ebookid).subscribe(() => this.ngOnInit());
  }

  // Filter clients based on the search term
  filter() {
    if (!this.searchTerm) {
      return this.clients.rows; // Return all clients if no search term is provided
    }

    // Filter clients based on whether their first name or last name matches the search term
    const filteredClients = this.clients.rows.filter((client: any) => {
      const firstNameMatch = client.Client.firstname.toLowerCase().includes(this.searchTerm.toLowerCase());
      const lastNameMatch = client.Client.lastname.toLowerCase().includes(this.searchTerm.toLowerCase());

      return firstNameMatch || lastNameMatch;
    });

    return filteredClients; // Return the filtered list of clients
  }
}
