import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Service is available application-wide
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Get admin profile
  getadmin() {
    return this.http.get('http://localhost:3000/admin/profile');
  }

  // Update admin profile
  updateadmin(body: any, id: any) {
    return this.http.patch(`http://localhost:3000/admin/updateprofile/${id}`, body);
  }

  // Update admin password
  updatepassword(body: any, id: any) {
    return this.http.patch(`http://localhost:3000/admin/updatepassword/${id}`, body);
  }

  // Update centre password
  updatecentrepassword(body: any, id: any) {
    return this.http.patch(`http://localhost:3000/centre/updatepassword/${id}`, body);
  }

  // Update client password
  updateclientpassword(body: any, id: any) {
    return this.http.patch(`http://localhost:3000/client/updatepassword/${id}`, body);
  }

  // Get all centres
  getcentres() {
    return this.http.get('http://localhost:3000/centre/profiles');
  }

  // Delete a centre
  deletecentre(id: any) {
    return this.http.delete(`http://localhost:3000/centre/deleteprofile/${id}`);
  }

  // Get a specific centre's profile
  getcentre(id: any) {
    return this.http.get(`http://localhost:3000/centre/profile/${id}`);
  }

  // Get formations for a specific centre
  getcentreformations(id: any) {
    return this.http.get(`http://localhost:3000/centre/formation/${id}`);
  }

  // Get ebooks for a specific centre
  getcentreebooks(id: any) {
    return this.http.get(`http://localhost:3000/centre/ebook/${id}`);
  }

  // Get ebook by ID
  getebookbyid(id: any) {
    return this.http.get(`http://localhost:3000/ebook/${id}`);
  }

  // Delete an ebook
  deleteebook(id: any) {
    return this.http.delete(`http://localhost:3000/deleteebook/${id}`);
  }

  // Get formation by ID
  getformation(id: any) {
    return this.http.get(`http://localhost:3000/formation/${id}`);
  }

  // Delete a formation
  deleteformation(id: any) {
    return this.http.delete(`http://localhost:3000/deleteformation/${id}`);
  }

  // Get all clients
  getclients() {
    return this.http.get('http://localhost:3000/client/profiles');
  }

  // Delete a client
  deleteclient(id: any) {
    return this.http.delete(`http://localhost:3000/client/deleteprofile/${id}`);
  }

  // Get a specific client's profile
  getclient(id: any) {
    return this.http.get(`http://localhost:3000/client/profile/${id}`);
  }

  // Download ebook by ID
  downloadebook(id: string): Observable<any> {
    const url = `http://localhost:3000/download-book/${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  // Get client participation data
  getclientparticipation(id: any) {
    return this.http.get(`http://localhost:3000/participation/${id}`);
  }

  // Get client purchase data
  getclientachat(id: any) {
    return this.http.get(`http://localhost:3000/acheter/${id}`);
  }

  // Get all formations
  getallformations() {
    return this.http.get('http://localhost:3000/formations');
  }

  // Get all ebooks
  getallbooks() {
    return this.http.get('http://localhost:3000/ebooks');
  }

  // Delete participation record
  deleteparticipation(clientid: any, formationid: any) {
    return this.http.delete(`http://localhost:3000/deleteparticipation/${clientid}/${formationid}`);
  }

  // Delete purchase record
  deleteachatclient(clientid: any, bookid: any) {
    return this.http.delete(`http://localhost:3000/deleteachat/${clientid}/${bookid}`);
  }

  // Register a new centre
  registrecentre(body: any) {
    return this.http.post('http://localhost:3000/centre/register', body);
  }

  // Register a new client
  registreclient(body: any) {
    return this.http.post('http://localhost:3000/client/register', body);
  }

  // Update centre profile
  updatecentre(id: any, body: any) {
    return this.http.patch(`http://localhost:3000/centre/updateprofile/${id}`, body);
  }

  // Update client profile
  updateclient(id: any, body: any) {
    return this.http.patch(`http://localhost:3000/client/updateprofile/${id}`, body);
  }

  // Update formation details
  updateformation(id: any, body: any) {
    return this.http.patch(`http://localhost:3000/updateformation/${id}`, body);
  }

  // Update ebook details
  updateebook(id: any, body: any) {
    return this.http.patch(`http://localhost:3000/updateebook/${id}`, body);
  }

  // Get participant by ID
  getparticipant(id: any) {
    return this.http.get(`http://localhost:3000/participant/${id}`);
  }

  // Delete participant record
  deleteparticipant(clientid: any, formationid: any) {
    return this.http.delete(`http://localhost:3000/deleteparticipation/${clientid}/${formationid}`);
  }

  // Get buyers for an ebook
  getbuyersebook(ebookid: any) {
    return this.http.get(`http://localhost:3000/acheteur/${ebookid}`);
  }

  // Delete a purchase record
  deleteachat(clientid: any, ebookid: any) {
    return this.http.delete(`http://localhost:3000/deleteachat/${clientid}/${ebookid}`);
  }

  // Update admin profile image
  updateaadminimage(img: any, id: any) {
    return this.http.patch(`http://localhost:3000/admin/updateimage/${id}`, img);
  }

  // Update centre profile image
  updatecentreimage(img: any, id: any) {
    return this.http.patch(`http://localhost:3000/centre/updateimage/${id}`, img);
  }

  // Update client profile image
  updateclientimage(img: any, id: any) {
    return this.http.patch(`http://localhost:3000/client/updateimage/${id}`, img);
  }

  // Update client CV
  updatecv(cv: any, id: any) {
    return this.http.patch(`http://localhost:3000/client/updatecv/${id}`, cv);
  }

  // Add a new formation
  addformation(body: any, id: any) {
    return this.http.post(`http://localhost:3000/addformation/${id}`, body);
  }

  // Get participation data by centre and client
  getparticipationbycentre(ClientId: any, CentreId: any) {
    return this.http.get(`http://localhost:3000/participation/${ClientId}/${CentreId}`);
  }

  // Get purchase data for a centre
  getachatforcentre(ClientId: any, CentreId: any) {
    return this.http.get(`http://localhost:3000/achat/${ClientId}/${CentreId}`);
  }

  // Add a new ebook by centre
  addebookbycentre(body: any, id: any) {
    return this.http.post(`http://localhost:3000/addebook/${id}`, body);
  }

  // Update formation image
  updateformationimage(img: any, id: any) {
    return this.http.patch(`http://localhost:3000/updateformationimage/${id}`, img);
  }

  // Participate in a formation
  participation(body: any) {
    return this.http.post(`http://localhost:3000/participer`, body);
  }

  // Purchase a formation
  acheter(body: any) {
    return this.http.post(`http://localhost:3000/acheterclient`, body);
  }

  // Get counts for various entities
  getcounts() {
    return this.http.get('http://localhost:3000/counts');
  }

}
