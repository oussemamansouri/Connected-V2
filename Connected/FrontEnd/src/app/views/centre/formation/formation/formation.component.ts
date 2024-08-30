import { Component, OnInit } from '@angular/core'; // Import Angular core component
import { Router } from '@angular/router'; // Import Router for navigation
import { ApiService } from './../../../../services/crud/api.service'; // Import custom API service
import { JwtHelperService } from '@auth0/angular-jwt'; // Import JwtHelperService for decoding JWT tokens

@Component({
  selector: 'app-formation', // Component selector
  templateUrl: './formation.component.html', // Path to the component's HTML template
  styleUrls: ['./formation.component.scss'] // Path to the component's stylesheet
})
export class FormationComponent implements OnInit {

  searchTerm: any; // Search term for filtering formations
  formations: any; // List of formations
  formation: any = {}; // Data of the selected formation
  formationid: any; // ID of the selected formation
  imagepath: any = 'http://localhost:3000/'; // Base path for images
  participation: any = []; // List of participants in the selected formation
  hepler = new JwtHelperService(); // Instance of JwtHelperService

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    // Decode token and fetch formations for the centre
    let token: any = localStorage.getItem('token');
    let decodedtoken: any = this.hepler.decodeToken(token);
    let centreid = decodedtoken.id;
    this.api.getcentreformations(centreid).subscribe(data => this.formations = data);
  }

  getformationid(id: any) {
    // Fetch formation details and participants
    this.formationid = id;
    this.api.getformation(id).subscribe(data => {
      this.formation = data;
      // Convert certification status to human-readable format
      if (this.formation.certifiee === 'true') {
        this.formation.certifiee = 'Oui';
      } else if (this.formation.certifiee === 'false') {
        this.formation.certifiee = 'Non';
      }
    });
    this.api.getparticipant(id).subscribe(info => this.participation = info);
  }

  deleteformation() {
    // Delete the selected formation and refresh the list
    this.api.deleteformation(this.formationid).subscribe(() => this.ngOnInit());
  }

  sendid() {
    // Navigate to formation update page with the formation ID
    this.router.navigate(['/centre/formation/update'], { queryParams: { formationId: this.formationid } });
  }

  sendformationid() {
    // Navigate to formation participants page with the formation ID
    this.router.navigate(['/centre/formation/participants'], { queryParams: { formationId: this.formationid } });
  }

  filter() {
    // Filter formations based on search term
    if (!this.searchTerm) {
      return this.formations;
    }
    return this.formations.filter((item: any) =>
      item.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
