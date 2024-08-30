import { Router, ActivatedRoute } from '@angular/router'; // Importing Router and ActivatedRoute for navigation and route handling
import { ApiService } from './../../../../services/crud/api.service'; // Importing custom service for API operations
import { NgForm } from '@angular/forms'; // Importing NgForm for handling forms
import { Component, OnInit } from '@angular/core'; // Importing necessary Angular components

@Component({
  selector: 'app-update-centre', // Selector used to identify the component
  templateUrl: './update-centre.component.html', // Template file for the component
  styleUrls: ['./update-centre.component.scss'] // Stylesheet for the component
})
export class UpdateCentreComponent implements OnInit {

  centre: any; // Variable to hold the data of the centre to be updated
  centreId: any; // Variable to store the centre ID obtained from the route parameters

  constructor(private api: ApiService, private router: Router, private param: ActivatedRoute) { }

  ngOnInit(): void {
    // Method that runs when the component is initialized
    this.centreId = this.param.snapshot.queryParams['centreId']; // Getting the centre ID from the route query parameters
    this.api.getcentre(this.centreId).subscribe(data => { this.centre = data }); // Fetching centre details using the centre ID
  }

  updatecentre(f: NgForm) {
    // Method to update the centre information
    let body = f.value; // Getting the form values

    // Calling the API to update the centre with the new data and then navigating to the centre details page
    this.api.updatecentre(this.centreId, body).subscribe(info => 
      this.router.navigate(['/admin/centre/details'], { queryParams: { centreId: this.centreId } })
    );
  }

}
