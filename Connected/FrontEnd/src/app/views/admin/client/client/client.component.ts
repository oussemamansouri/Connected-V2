import { Router } from '@angular/router';
import { ApiService } from './../../../../services/crud/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  searchTerm: any; // Term used for filtering the list of clients
  clients: any; // Holds the list of clients
  clientid: any; // Stores the ID of the selected client

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    // Fetch the list of clients on component initialization
    this.api.getclients().subscribe(info => this.clients = info);
  }

  // Set the selected client ID
  getclientid(id: any) {
    this.clientid = id;
  }

  // Navigate to the client details page with the selected client ID
  sendId(id: any) {
    this.router.navigate(['/admin/client/details'], { queryParams: { clientId: id } });
  }

  // Navigate to the client update page with the selected client ID
  sendclientId(id: any) {
    this.router.navigate(['/admin/client/update'], { queryParams: { clientId: id } });
  }

  // Delete the selected client and refresh the client list
  deleteclient() {
    this.api.deleteclient(this.clientid).subscribe(() => this.ngOnInit());
  }

  // Filter clients based on the search term
  filter() {
    if (!this.searchTerm) {
      return this.clients;
    }

    const filteredClients = this.clients.filter((client: any) => {
      const firstNameMatch = client.firstname.toLowerCase().includes(this.searchTerm.toLowerCase());
      const lastNameMatch = client.lastname.toLowerCase().includes(this.searchTerm.toLowerCase());

      return firstNameMatch || lastNameMatch;
    });

    return filteredClients;
  }
}
