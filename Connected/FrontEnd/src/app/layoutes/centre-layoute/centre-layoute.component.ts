import { DOCUMENT } from '@angular/common'; // Import Document token to interact with the DOM
import { Component, Inject, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'; // Import Router for navigation
import { JwtHelperService } from '@auth0/angular-jwt'; // Import JWT helper service to manage tokens
import { ApiService } from 'src/app/services/crud/api.service'; // Import ApiService for CRUD operations

@Component({
  selector: 'app-centre-layoute', // Selector for the centre layout component
  templateUrl: './centre-layoute.component.html', // Path to the component's HTML template
  styleUrls: ['./centre-layoute.component.scss'] // Path to the component's SCSS styles
})
export class CentreLayouteComponent implements OnInit {

  data: any; // Variable to hold centre data
  token: any; // Variable to hold the token
  imagepath: any = 'http://localhost:3000/'; // Base path for images
  helper = new JwtHelperService(); // Instance of the JwtHelperService

  // Constructor to inject necessary services
  constructor(
    @Inject(DOCUMENT) private document: Document, // Inject Document to access DOM elements
    private route: Router, // Inject Router for navigation
    private api: ApiService // Inject ApiService for making API requests
  ) {}

  // Method to handle user logout
  logout() {
    localStorage.removeItem('token'); // Remove the authentication token from local storage
    this.route.navigate(['/']); // Redirect the user to the home page
  }

  // Lifecycle hook that runs after the component is initialized
  ngOnInit(): void {
    let token: any = localStorage.getItem('token'); // Retrieve token from local storage
    let decodedtoken = this.helper.decodeToken(token); // Decode the token to extract user information
    this.api.getcentre(decodedtoken.id).subscribe(data => this.data = data); // Fetch centre data using the decoded token ID
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
