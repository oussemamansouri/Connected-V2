import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root' // Service is available application-wide
})
export class AuthontificationService {

  helper = new JwtHelperService(); // Instance of JWT helper service

  constructor(private http: HttpClient) { }

  // Method to send login credentials to the server
  login(body: any) {
    return this.http.post('http://localhost:3000/login', body); // Send POST request to login endpoint
  }

  // Method to save the token in local storage
  savedata(token: any) {
    localStorage.setItem('token', token); // Store token in local storage
  }

  // Method to check if the user is logged in
  logedin(): boolean {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    return !!token && !this.helper.isTokenExpired(token); // Return true if token exists and is not expired
  }

}
