import { Router } from '@angular/router';
import { ApiService } from './../../../../services/crud/api.service';
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-centre-de-formation',
  templateUrl: './centre-de-formation.component.html',
  styleUrls: ['./centre-de-formation.component.scss']
})
export class CentreDeFormationComponent implements OnInit {
  profiles: any; // Stores the list of training centers
  imagepath: any = 'http://localhost:3000/'; // Base path for images
  centreId: any; // Stores the ID of the selected training center
  searchTerm: any; // Stores the search term for filtering the centers

  constructor(private elementRef: ElementRef, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    // Fetch the list of training centers and assign it to profiles
    this.api.getcentres().subscribe(data => {
      this.profiles = data;
    });
  }

  // Delete the selected training center and refresh the list
  deletecentre() {
    this.api.deletecentre(this.centreId).subscribe(() => {
      this.ngOnInit(); // Refresh the list of centers
    });
  }

  // Set the centreId to the selected training center's ID
  selectId(id: any) {
    this.centreId = id;
  }

  // Navigate to the update page for the selected training center
  sendid(id: any) {
    this.router.navigate(['/admin/centre/update'], { queryParams: { centreId: id } });
  }

  // Navigate to the details page for the selected training center
  detIdcentre(id: any) {
    this.router.navigate(['/admin/centre/details'], { queryParams: { centreId: id } });
  }

  // Filter the list of centers based on the search term
  filter() {
    if (!this.searchTerm) {
      return this.profiles; // Return all centers if no search term is provided
    }

    // Filter centers where the name includes the search term
    return this.profiles.filter((item: any) =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
