import { ActivatedRoute, Router } from '@angular/router'; // Importing Router and ActivatedRoute for navigation and route handling
import { ApiService } from './../../../../services/crud/api.service'; // Importing custom service for API operations
import { NgForm } from '@angular/forms'; // Importing NgForm for handling forms
import { HttpErrorResponse } from '@angular/common/http'; // Importing HttpErrorResponse for error handling
import { Component, OnInit } from '@angular/core'; // Importing necessary Angular components

@Component({
  selector: 'app-update-formation', // Selector used to identify the component
  templateUrl: './update-formation.component.html', // Template file for the component
  styleUrls: ['./update-formation.component.scss'] // Stylesheet for the component
})
export class UpdateFormationComponent implements OnInit {

  formation: any = {}; // Variable to hold the formation data to be updated
  formationid: any; // Variable to store the formation ID obtained from the route parameters
  errmessage: any; // Variable to hold error messages during the update process
  certifiee: any = false; // Variable to handle the certification status

  constructor(private api: ApiService, private param: ActivatedRoute, private router: Router) { }

  convertDate(dateString: string): string {
    // Method to convert a date string to 'YYYY-MM-DD' format
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    // Method that runs when the component is initialized
    this.formationid = this.param.snapshot.queryParams['formationId']; // Getting the formation ID from the route query parameters
    this.api.getformation(this.formationid).subscribe(data => {
      this.formation = data; // Fetching formation details using the formation ID
    });
    console.log(this.formation.date_debut); // Logging the formation's start date for debugging
  }

  Date() {
    // Method to get the maximum allowable date (today's date)
    const today = new Date().toISOString().split('T')[0];
    return today;
  }

  certification() {
    // Method to toggle the certification status
    this.certifiee = !this.certifiee;
  }

  updateformation(f: NgForm) {
    // Method to update the formation information
    let body = f.value; // Getting the form values
    body.certifiee = this.certifiee.toString(); // Convert boolean to string for the certification status

    // Calling the API to update the formation with the new data and handling the response
    this.api.updateformation(this.formationid, body).subscribe(
      info => this.router.navigate(['/admin/formation']), // Navigating to the formation list page on success
      (err: HttpErrorResponse) => this.errmessage = err.error // Setting error message if update fails
    );
  }

}
