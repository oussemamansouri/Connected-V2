import { ApiService } from './../../../../services/crud/api.service'; // Importing custom service for API operations
import { Router, ActivatedRoute } from '@angular/router'; // Importing Angular's Router and ActivatedRoute for navigation and route management
import { Component, OnInit } from '@angular/core'; // Importing necessary Angular components

@Component({
  selector: 'app-participants', // Selector used to identify the component
  templateUrl: './participants.component.html', // Template file for the component
  styleUrls: ['./participants.component.scss'] // Stylesheet for the component
})
export class ParticipantsComponent implements OnInit {
  clients: any; // Variable to hold the list of clients (participants)
  clientid: any; // Variable to store the selected client ID
  formationid: any; // Variable to store the formation ID obtained from the route parameters
  searchTerm: any; // Variable to hold the search term input by the user

  constructor(private router: Router, private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Method that runs when the component is initialized
    this.formationid = this.route.snapshot.queryParams['formationId']; // Getting the formation ID from the route query parameters
    this.api.getparticipant(this.formationid).subscribe(data => this.clients = data); // Fetching participants for the given formation ID
  }

  sendId(id: any) {
    // Method to navigate to the client details page with the selected client ID
    this.router.navigate(['/admin/client/details'], { queryParams: { clientId: id } });
  }

  getclientid(id: any) {
    // Method to store the selected client ID
    this.clientid = id;
  }

  deleteparticipant() {
    // Method to delete a participant from the formation
    this.api.deleteparticipant(this.clientid, this.formationid).subscribe(info => this.ngOnInit()); // Deleting the participant and refreshing the list
  }

  filter() {
    // Method to filter the participants based on the search term
    if (!this.searchTerm) {
      return this.clients.rows; // If no search term is entered, return all participants
    }

    // Filtering participants based on matching first or last names with the search term
    const filteredClients = this.clients.rows.filter((client: any) => {
      const firstNameMatch = client.Client.firstname.toLowerCase().includes(this.searchTerm.toLowerCase());
      const lastNameMatch = client.Client.lastname.toLowerCase().includes(this.searchTerm.toLowerCase());
      return firstNameMatch || lastNameMatch;
    });

    return filteredClients; // Returning the filtered list of participants
  }
}
