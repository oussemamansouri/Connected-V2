import { ApiService } from './../../services/crud/api.service'; // Import the service for API calls
import { JwtHelperService } from '@auth0/angular-jwt'; // Import the JWT helper service for token management
import { Router } from '@angular/router'; // Import the Router for navigation
import { Component, OnInit, Inject } from '@angular/core'; 
import { DOCUMENT } from '@angular/common'; // Import the Document token to interact with the DOM

@Component({
  selector: 'app-admin-layoute', // Selector for the admin layout component
  templateUrl: './admin-layoute.component.html', // Path to the component's HTML template
  styleUrls: ['./admin-layoute.component.scss'] // Path to the component's SCSS styles
})
export class AdminLayouteComponent implements OnInit {

  data: any; // Variable to hold admin data
  token: any; // Variable to hold the token
  imagepath: any = 'http://localhost:3000/'; // Base path for images
  helper = new JwtHelperService(); // Instance of the JwtHelperService

  // Injecting necessary services into the constructor
  constructor(@Inject(DOCUMENT) private document: Document, private route: Router, private api: ApiService) {
    // Fetch admin data on component initialization
    this.api.getadmin().subscribe(info => {
      this.data = info; // Assign the fetched data to the 'data' variable
    });
  }

  // Method to handle user logout
  logout() {
    localStorage.removeItem('token'); // Remove the authentication token from local storage
    this.route.navigate(['/']); // Redirect the user to the home page
  }

  // Lifecycle hook that runs after the component is initialized
  ngOnInit(): void {
    // Any initialization logic can go here
  }

  // Method to toggle the sidebar visibility
  sidebarToggle() {
    this.document.body.classList.toggle('toggle-sidebar'); // Toggle the 'toggle-sidebar' class on the body element
  }

  // Method to scroll to the top of the page
  scrollTop() {
    window.scroll({
      top: 0, // Scroll to the top of the page
      left: 0, // Horizontal position remains unchanged
      behavior: 'smooth' // Smooth scrolling effect
    });
  }

}
