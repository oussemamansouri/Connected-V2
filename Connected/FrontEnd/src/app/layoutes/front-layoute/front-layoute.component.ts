import { ApiService } from './../../services/crud/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthontificationService } from 'src/app/services/authontification/authontification.service';

@Component({
  selector: 'app-front-layoute',
  templateUrl: './front-layoute.component.html',
  styleUrls: ['./front-layoute.component.scss']
})
export class FrontLayouteComponent implements OnInit {
  isSidebarOpen = false; // State variable to track sidebar visibility
  data: any;
  imagepath: any = 'http://localhost:3000/'; // Base URL for images
  helper = new JwtHelperService(); // Instance of JWT helper service

  constructor(
    @Inject(DOCUMENT) private document: Document, // Inject Document for DOM manipulation
    private route: Router,                        // Inject Router for navigation
    private api: ApiService,                      // Inject ApiService for API calls
    private auth: AuthontificationService         // Inject AuthontificationService for authentication logic
  ) { }

  // Method to handle user logout
  logout() {
    localStorage.removeItem('token'); // Remove token from local storage
    this.route.navigate(['/']);       // Redirect to the home page
    this.ngOnInit();                  // Reinitialize the component
  }

  // Method to toggle the sidebar visibility
  sidebarToggle() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token'); // Get the token from local storage

    if (token) {
      const decodedToken = this.helper.decodeToken(token); // Decode the token to extract user information

      // Convert the 'client' role to 'Apprenant'
      if (decodedToken.role === 'client') {
        decodedToken.role = 'Apprenant';
      }

      this.data = decodedToken; // Store the decoded token data
    } else {
      this.data = ''; // If no token, set data to an empty string
    }
  }

  // Method to navigate to the appropriate profile page based on user role
  navigateprofile() {
    switch (this.data.role) {
      case 'admin':
        this.route.navigate(['/admin']);
        break;
      case 'client':
        this.route.navigate(['/client']);
        break;
      case 'centre':
        this.route.navigate(['/centre']);
        break;
      default:
        this.route.navigate(['/login']);
    }
  }

  // Method to scroll the page to the top
  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
