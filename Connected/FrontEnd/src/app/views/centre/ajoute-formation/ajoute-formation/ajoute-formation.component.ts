import { Component, OnInit } from '@angular/core'; // Importing Angular core component
import { HttpErrorResponse } from '@angular/common/http'; // Importing HttpErrorResponse for handling errors
import { Router } from '@angular/router'; // Importing Router for navigation
import { NgForm } from '@angular/forms'; // Importing NgForm for form handling
import { ApiService } from './../../../../services/crud/api.service'; // Importing custom API service
import { JwtHelperService } from '@auth0/angular-jwt'; // Importing JwtHelperService for token decoding

@Component({
  selector: 'app-ajoute-formation', // Selector for identifying the component
  templateUrl: './ajoute-formation.component.html', // Path to the HTML template file
  styleUrls: ['./ajoute-formation.component.scss'] // Path to the stylesheet file
})
export class AjouteFormationComponent implements OnInit {
  img: any; // Variable to hold the selected image file
  errmessage: any; // Variable to hold error messages
  helper = new JwtHelperService(); // JWT helper for decoding tokens
  selectedCategory: any; // Variable to hold the selected category
  certifiee: any = false; // Boolean to indicate if the formation is certified

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    // Lifecycle hook called after the component is initialized
  }

  selectImage(event: any) {
    // Method to handle image file selection
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      console.log(this.img); // Log current image for debugging
      this.img = path; // Assign selected image file to `img` variable
    }
  }

  centreid() {
    // Method to get the centre ID from the decoded JWT token
    let token: any = localStorage.getItem('token'); // Retrieve token from local storage
    let decodedtoken: any = this.helper.decodeToken(token); // Decode the token
    return decodedtoken.id; // Return the centre ID from the decoded token
  }

  maxDate() {
    // Method to get today's date in YYYY-MM-DD format for form validation
    const today = new Date().toISOString().split('T')[0];
    return today;
  }

  certification() {
    // Method to toggle the certification status
    this.certifiee = !this.certifiee; // Toggle the boolean value
  }

  addformation(f: NgForm) {
    // Method to handle the addition of a new formation
    let body = f.value; // Get form values
    const formData = new FormData();
    formData.append('titre', body.titre); // Append form values to FormData
    formData.append('discription', body.discription);
    formData.append('img', this.img);
    formData.append('prix', body.prix);
    formData.append('heures', body.heures);
    formData.append('promotion', body.promotion);
    formData.append('date_debut', body.date_debut);
    formData.append('date_fin', body.date_fin);
    formData.append('categorie', body.categorie);
    formData.append('etat', body.etat);
    formData.append('diplome', body.diplome);
    formData.append('certifiee', this.certifiee.toString()); // Convert boolean to string

    // Call API to add formation and handle response
    this.api.addformation(formData, this.centreid()).subscribe(
      info => this.router.navigate(['/centre/formation']), // Navigate to formation list on success
      (err: HttpErrorResponse) => this.errmessage = err.error // Set error message on failure
    );
  }

  currentCategory: string = ''; // Variable to hold the current category for dropdown

  toggleDropdown(event: Event, category: string) {
    // Method to handle dropdown toggle for categories
    event.stopPropagation(); // Prevent event from propagating to parent elements

    // Remove show class from current category
    const currentElement = document.querySelector(`.dropdown-submenu[aria-label="${this.currentCategory}"] > ul`);
    if (currentElement) {
      currentElement.classList.remove('show');
    }

    // Add show class to clicked category
    const clickedElement = document.querySelector(`.dropdown-submenu[aria-label="${category}"] > ul`);
    if (clickedElement) {
      clickedElement.classList.add('show');
    }

    this.currentCategory = category; // Update current category
  }
}
