import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from 'src/app/services/crud/api.service';

@Component({
  selector: 'app-client-layoute',
  templateUrl: './client-layoute.component.html',
  styleUrls: ['./client-layoute.component.scss']
})
export class ClientLayouteComponent implements OnInit {
  data: any;
  token: any;

  // Base path for images
  imagepath: any = 'http://localhost:3000/';

  // Instance of JWT helper service
  helper = new JwtHelperService();

  constructor(
    @Inject(DOCUMENT) private document: Document, // Inject Document for DOM manipulation
    private route: Router,                       // Inject Router for navigation
    private api: ApiService                      // Inject ApiService for API calls
  ) { }

  // Method to handle user logout
  logout() {
    localStorage.removeItem('token'); // Remove token from local storage
    this.route.navigate(['/']);       // Redirect to the home page
  }

  ngOnInit(): void {
    // Get the token from local storage
    let token: any = localStorage.getItem('token');

    // Decode the token to extract user information
    let decodedtoken = this.helper.decodeToken(token);

    // Fetch client data based on the decoded user ID
    this.api.getclient(decodedtoken.id).subscribe(data => this.data = data);
  }

  // Method to toggle the sidebar visibility
  sidebarToggle() {
    this.document.body.classList.toggle('toggle-sidebar');
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
