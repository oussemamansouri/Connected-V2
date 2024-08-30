import { Component, OnInit } from '@angular/core'; // Import Angular core component
import { ActivatedRoute, Router } from '@angular/router'; // Import Router and ActivatedRoute for navigation and route parameters
import { ApiService } from './../../../../services/crud/api.service'; // Import custom API service
import { NgForm } from '@angular/forms'; // Import Angular forms module
import { HttpErrorResponse } from '@angular/common/http'; // Import HTTP error response

@Component({
  selector: 'app-update-formation', // Component selector
  templateUrl: './update-formation.component.html', // Path to the component's HTML template
  styleUrls: ['./update-formation.component.scss'] // Path to the component's stylesheet
})
export class UpdateFormationComponent implements OnInit {
  formation: any = {}; // Formation details
  formationid: any; // Formation ID
  errmessage: any; // Error message
  certifiee: any = false; // Certification status

  constructor(private api: ApiService, private param: ActivatedRoute, private router: Router) { }

  // Convert date string to YYYY-MM-DD format
  convertDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    // Retrieve formation ID from query parameters and fetch formation details
    this.formationid = this.param.snapshot.queryParams['formationId'];
    this.api.getformation(this.formationid).subscribe(data => {
      this.formation = data;
    });
    console.log(this.formation.date_debut); // Log the start date for debugging
  }

  // Toggle certification status
  certification() {
    this.certifiee = !this.certifiee;
  }

  // Get today's date in YYYY-MM-DD format
  Date() {
    const today = new Date().toISOString().split('T')[0];
    return today;
  }

  // Handle formation update
  updateformation(f: NgForm) {
    let body = f.value;
    body.certifiee = this.certifiee.toString(); // Convert boolean to string
    this.api.updateformation(this.formationid, body).subscribe(
      info => this.router.navigate(['/centre/formation']), // Navigate on success
      err => this.errmessage = err.error // Handle error
    );
  }
}
