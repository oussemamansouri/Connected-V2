import { ApiService } from './../../../../services/crud/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cetre-details',
  templateUrl: './cetre-details.component.html',
  styleUrls: ['./cetre-details.component.scss']
})
export class CetreDetailsComponent implements OnInit {
  participation: any = []; // Stores participation data for formations
  buys: any = []; // Stores buyer information for eBooks
  profile: any; // Stores details of the training center
  formations: any = []; // Stores the list of formations offered by the center
  ebooks: any = []; // Stores the list of eBooks offered by the center
  ebookid: any; // Stores the ID of the selected eBook
  formationid: any; // Stores the ID of the selected formation
  CentreId: any; // Stores the ID of the center
  formation: any = {}; // Stores details of a selected formation
  ebook: any = {}; // Stores details of a selected eBook
  imagepath: any = 'http://localhost:3000/'; // Base URL for images

  constructor(private aroute: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    // Get the center ID from query params and fetch related data
    this.CentreId = this.aroute.snapshot.queryParams['centreId'];
    this.api.getcentre(this.CentreId).subscribe(info => this.profile = info);
    this.api.getcentreformations(this.CentreId).subscribe(info => this.formations = info);
    this.api.getcentreebooks(this.CentreId).subscribe(info => this.ebooks = info);
  }

  // Update the center's image
  updateimage(event: any) {
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      const formData = new FormData();
      formData.append('img', path);
      this.api.updatecentreimage(formData, this.CentreId).subscribe(() => this.ngOnInit());
    }
  }

  // Navigate to the eBook buying page
  sendid2() {
    this.router.navigate(['/admin/ebook/buys'], { queryParams: { ebookId: this.ebookid } });
  }

  // Fetch eBook details and buyers by eBook ID
  getbookId(id: any) {
    this.ebookid = id;
    this.api.getebookbyid(id).subscribe(info => this.ebook = info);
    this.api.getbuyersebook(id).subscribe(data => this.buys = data);
  }

  // Fetch formation details and participants by formation ID
  getformationid(id: any) {
    this.formationid = id;
    this.api.getformation(id).subscribe(data => {
      this.formation = data;
      // Convert boolean-like string to human-readable format
      if (this.formation.certifiee === 'true') {
        this.formation.certifiee = 'Oui';
      } else if (this.formation.certifiee === 'false') {
        this.formation.certifiee = 'Non';
      }
    });
    this.api.getparticipant(id).subscribe(info => this.participation = info);
  }

  // Delete the selected eBook and refresh data
  deleteebook() {
    this.api.deleteebook(this.ebookid).subscribe(() => this.ngOnInit());
  }

  // Navigate to the formation update page
  sendid() {
    this.router.navigate(['/admin/formation/update'], { queryParams: { formationId: this.formationid } });
  }

  // Delete the selected formation and refresh data
  deleteformation() {
    this.api.deleteformation(this.formationid).subscribe(() => this.ngOnInit());
  }

  // Navigate to the formation participants page
  sendformationid() {
    this.router.navigate(['/admin/formation/participants'], { queryParams: { formationId: this.formationid } });
  }

  // Download the selected eBook
  downloadebook() {
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
      a.remove(); // remove the element
    });
  }

  // Navigate to the eBook update page
  sendebookid() {
    this.router.navigate(['/admin/ebook/update'], { queryParams: { ebookId: this.ebookid } });
  }

  // Navigate to the center update page
  sendidcentre() {
    this.router.navigate(['/admin/centre/update'], { queryParams: { centreId: this.CentreId } });
  }

  // Delete the selected center and refresh data
  deletecentre() {
    this.api.deletecentre(this.CentreId).subscribe(() => this.ngOnInit());
  }
}
