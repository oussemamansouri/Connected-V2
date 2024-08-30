import { Component, OnInit } from '@angular/core'; // Import Angular core component
import { ApiService } from './../../../../services/crud/api.service'; // Import custom API service
import { Router, ActivatedRoute } from '@angular/router'; // Import Router and ActivatedRoute for navigation and route handling

@Component({
  selector: 'app-participants', // Component selector
  templateUrl: './participants.component.html', // Path to the component's HTML template
  styleUrls: ['./participants.component.scss'] // Path to the component's stylesheet
})
export class ParticipantsComponent implements OnInit {
  clients: any; // List of clients participating in the formation
  clientid: any; // ID of the selected client
  formationid: any; // ID of the selected formation
  searchTerm: any; // Search term for filtering clients

  constructor(private router: Router, private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Fetch participants for the given formation ID from the route parameters
    this.formationid = this.route.snapshot.queryParams['formationId'];
    this.api.getparticipant(this.formationid).subscribe(data => this.clients = data);
  }

  sendId(id: any) {
    // Navigate to client details page with the client ID
    this.router.navigate(['/centre/client/details'], { queryParams: { clientId: id } });
  }

  getclientid(id: any) {
    // Set the selected client ID
    this.clientid = id;
  }

  deleteparticipant() {
    // Delete the selected participant and refresh the list
    this.api.deleteparticipant(this.clientid, this.formationid).subscribe(() => this.ngOnInit());
  }

  filter() {
    // Filter clients based on search term
    if (!this.searchTerm) {
      return this.clients.rows;
    }

    const filteredClients = this.clients.rows.filter((client: any) => {
      const firstNameMatch = client.Client.firstname.toLowerCase().includes(this.searchTerm.toLowerCase());
      const lastNameMatch = client.Client.lastname.toLowerCase().includes(this.searchTerm.toLowerCase());

      return firstNameMatch || lastNameMatch;
    });

    return filteredClients;
  }
}
