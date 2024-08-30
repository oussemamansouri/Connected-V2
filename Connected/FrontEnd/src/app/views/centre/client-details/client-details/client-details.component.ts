import { Component, OnInit } from '@angular/core'; // Import Angular core component
import { ApiService } from './../../../../services/crud/api.service'; // Import custom API service
import { ActivatedRoute, Router } from '@angular/router'; // Import Router and ActivatedRoute for navigation and route parameters
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule for HTTP operations
import { JwtHelperService } from '@auth0/angular-jwt'; // Import JwtHelperService for decoding JWT tokens

@Component({
  selector: 'app-client-details', // Component selector
  templateUrl: './client-details.component.html', // Path to the component's HTML template
  styleUrls: ['./client-details.component.scss'] // Path to the component's stylesheet
})
export class ClientDetailsComponent implements OnInit {
  clientId: any; // ID of the client
  dataclient: any; // Data of the client
  imagepath: any = 'http://localhost:3000/'; // Base path for images
  participation: any = []; // List of participations
  participants: any = []; // List of participants in a formation
  achat: any = []; // List of purchases
  formationid: any; // ID of the selected formation
  formation: any = { // Data of the selected formation
    date_debut: "", date_fin: "", id: "", titre: "", discription: "", img: "", prix: "", heures: "", promotion: "", categorie: "", etat: "", diplome: "", certifiee: "", createdAt: "", updatedAt: "", CentreId: "", Centre: {}
  };
  buys: any = []; // List of purchases for an eBook
  ebookid: any; // ID of the selected eBook
  helper = new JwtHelperService(); // Instance of JwtHelperService

  ebook: any = { // Data of the selected eBook
    id: '', titre: '', discription: '', auteur: '', format: '', nb_pages: '', img: '', prix: '', promotion: '', book: '', createdAt: '', updatedAt: '', CentreId: ''
  };

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    // Decode token and fetch data based on client ID
    let token: any = localStorage.getItem('token');
    let decodedtoken: any = this.helper.decodeToken(token);
    this.clientId = this.route.snapshot.queryParams['clientId'];

    this.api.getclient(this.clientId).subscribe(data => this.dataclient = data);
    this.api.getparticipationbycentre(this.clientId, decodedtoken.id).subscribe(data => this.participation = data);
    this.api.getachatforcentre(this.clientId, decodedtoken.id).subscribe(data => this.achat = data);
  }

  sendid2() {
    // Navigate to eBook purchases page with the eBook ID
    this.router.navigate(['/centre/ebook/buys'], { queryParams: { ebookId: this.ebookid } });
  }

  getformationid(id: any) {
    // Fetch formation details and participants
    this.formationid = id;
    this.api.getformation(id).subscribe(data => {
      this.formation = data;
      // Set certification status text
      if (this.formation.certifiee == 'true') {
        this.formation.certifiee = 'Oui';
      } else if (this.formation.certifiee == 'false') {
        this.formation.certifiee = 'Non';
      }
    });
    this.api.getparticipant(id).subscribe(info => this.participants = info);
  }

  deleteformation() {
    // Delete participation record and refresh data
    this.api.deleteparticipation(this.clientId, this.formationid).subscribe(() => this.ngOnInit());
  }

  getbookId(id: any) {
    // Fetch eBook details and buyers
    this.ebookid = id;
    this.api.getebookbyid(id).subscribe(info => this.ebook = info);
    this.api.getbuyersebook(id).subscribe(data => this.buys = data);
  }

  deleteebook() {
    // Delete eBook purchase record and refresh data
    this.api.deleteachatclient(this.clientId, this.ebookid).subscribe(() => this.ngOnInit());
  }

  downloadebook() {
    // Download eBook file
    this.api.downloadebook(this.ebookid).subscribe((blob) => {
      const fileName = `Ebook.${this.ebook.format}`;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // Remove the download link
    });
  }

  sendformationid() {
    // Navigate to formation update page with the formation ID
    this.router.navigate(['/centre/formation/update'], { queryParams: { formationId: this.formationid } });
  }

  sendebookid() {
    // Navigate to eBook update page with the eBook ID
    this.router.navigate(['/centre/ebook/update'], { queryParams: { ebookId: this.ebookid } });
  }

  sendid() {
    // Navigate to participants page for the selected formation
    this.router.navigate(['/centre/formation/participants'], { queryParams: { formationId: this.formationid } });
  }
}
