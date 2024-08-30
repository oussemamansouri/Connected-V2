import { Component, OnInit } from '@angular/core'; // Import Angular core component
import { Router } from '@angular/router'; // Import Router for navigation
import { ApiService } from './../../../../services/crud/api.service'; // Import custom API service
import { JwtHelperService } from '@auth0/angular-jwt'; // Import JWT helper service

@Component({
  selector: 'app-formation', // Component selector
  templateUrl: './formation.component.html', // Path to the component's HTML template
  styleUrls: ['./formation.component.scss'] // Path to the component's stylesheet
})
export class FormationComponent implements OnInit {

  searchTerm: any; // Search term for filtering formations
  formations: any; // List of formations
  formation: any = { // Current formation details
    date_debut: "", date_fin: "", id: "", titre: "", discription: "", img: "", prix: "", heures: "", promotion: "", categorie: "", etat: "", diplome: "", certifiee: "", createdAt: "", updatedAt: "", CentreId: "", Centre: {}
  };
  formationid: any; // Current formation ID
  clientid: any; // Current client ID
  imagepath: any = 'http://localhost:3000/'; // Path for images
  participation: any = []; // List of participations
  hepler = new JwtHelperService(); // JWT helper instance

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    // Get token and decode to retrieve client ID
    let token: any = localStorage.getItem('token');
    let decodedtoken: any = this.hepler.decodeToken(token);
    this.clientid = decodedtoken.id;

    // Fetch formations that the client is participating in
    this.api.getclientparticipation(this.clientid).subscribe(data => this.formations = data);
  }

  // Retrieve formation details based on formation ID
  getformationid(id: any) {
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
  }

  // Delete participation record for the client
  deleteparticipation() {
    this.api.deleteparticipation(this.clientid, this.formationid).subscribe(info => this.ngOnInit());
  }

  // Filter formations based on search term
  filter() {
    if (!this.searchTerm) {
      // Return all formations if no search term
      return this.formations.map((item: any) => item.Formation);
    }

    // Filter formations based on title
    return this.formations
      .filter((item: any) => item.Formation.titre.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .map((item: any) => item.Formation);
  }
}
