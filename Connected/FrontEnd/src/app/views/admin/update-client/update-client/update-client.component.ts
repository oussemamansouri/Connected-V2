import { HttpErrorResponse } from '@angular/common/http'; // Importing HttpErrorResponse for error handling
import { Router, ActivatedRoute } from '@angular/router'; // Importing Router and ActivatedRoute for navigation and route handling
import { ApiService } from './../../../../services/crud/api.service'; // Importing custom service for API operations
import { NgForm } from '@angular/forms'; // Importing NgForm for handling forms
import { Component, OnInit } from '@angular/core'; // Importing necessary Angular components

@Component({
  selector: 'app-update-client', // Selector used to identify the component
  templateUrl: './update-client.component.html', // Template file for the component
  styleUrls: ['./update-client.component.scss'] // Stylesheet for the component
})
export class UpdateClientComponent implements OnInit {

  client: any; // Variable to hold the client's data to be updated
  clientId: any; // Variable to store the client ID obtained from the route parameters
  errmessage: any; // Variable to hold error messages during the update process

  constructor(private api: ApiService, private router: Router, private param: ActivatedRoute) { }

  ngOnInit(): void {
    // Method that runs when the component is initialized
    this.clientId = this.param.snapshot.queryParams['clientId']; // Getting the client ID from the route query parameters
    this.api.getclient(this.clientId).subscribe(data => { this.client = data }); // Fetching client details using the client ID
  }

  maxDate() {
    // Method to get the maximum allowable date (today's date)
    const today = new Date().toISOString().split('T')[0];
    return today;
  }

  updateclient(f: NgForm) {
    // Method to update the client's information
    let body = f.value; // Getting the form values

    // Calling the API to update the client with the new data and handling the response
    this.api.updateclient(this.clientId, body).subscribe(
      info => this.router.navigate(['/admin/client/details'], { queryParams: { clientId: this.clientId } }), // Navigating to the client details page on success
      (err: HttpErrorResponse) => this.errmessage = err.error // Setting error message if update fails
    );
  }

}
