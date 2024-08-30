import { Router } from '@angular/router'; // Importing Angular's Router for navigation between routes
import { ApiService } from './../../../../services/crud/api.service'; // Importing a custom service for API operations
import { Component, OnInit } from '@angular/core'; // Importing necessary Angular components

@Component({
  selector: 'app-formation', // Selector used to identify the component
  templateUrl: './formation.component.html', // Template file for the component
  styleUrls: ['./formation.component.scss'] // Stylesheet for the component
})
export class FormationComponent implements OnInit {
  searchTerm: any; // Variable to hold the search term input by the user
  formations: any; // Variable to hold the list of formations fetched from the API
  formation: any = {
    date_debut: "", date_fin: "", id: "", titre: "", discription: "", img: "", prix: "",
    heures: "", promotion: "", categorie: "", etat: "", diplome: "", certifiee: "",
    createdAt: "", updatedAt: "", CentreId: "", Centre: {}
  }; // Object to hold the details of a single formation
  formationid: any; // Variable to store the selected formation ID
  imagepath: any = 'http://localhost:3000/'; // Base path for image URLs
  participation: any = []; // Array to store participants of a formation

  constructor(private api: ApiService, private router: Router) { } // Injecting ApiService and Router into the component

  ngOnInit(): void {
    // Method that runs when the component is initialized
    this.api.getallformations().subscribe(data => this.formations = data); // Fetching all formations from the API
  }

  getformationid(id: any) {
    // Method to get the formation details by ID
    this.formationid = id; // Storing the selected formation ID
    this.api.getformation(id).subscribe(data => {
      this.formation = data; // Fetching the formation details
      // Formatting the 'certifiee' field for display purposes
      if (this.formation.certifiee == 'true') {
        this.formation.certifiee = 'Oui';
      } else if (this.formation.certifiee == 'false') {
        this.formation.certifiee = 'Non';
      }
    });
    // Fetching the participants of the selected formation
    this.api.getparticipant(id).subscribe(info => this.participation = info);
  }

  deleteformation() {
    // Method to delete the selected formation
    this.api.deleteformation(this.formationid).subscribe(info => this.ngOnInit()); // Deleting the formation and refreshing the list
  }

  sendid() {
    // Method to navigate to the formation update page with the selected formation ID
    this.router.navigate(['/admin/formation/update'], { queryParams: { formationId: this.formationid } });
  }

  sendformationid() {
    // Method to navigate to the participants page for the selected formation
    this.router.navigate(['/admin/formation/participants'], { queryParams: { formationId: this.formationid } });
  }

  filter() {
    // Method to filter the formations based on the search term
    if (!this.searchTerm) {
      return this.formations; // If no search term is entered, return all formations
    }

    // Return formations that match the search term in the title
    return this.formations.filter((item: any) =>
      item.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
