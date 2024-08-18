import { ApiService } from './../../services/crud/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Component, OnInit,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { AuthontificationService } from 'src/app/services/authontification/authontification.service';

@Component({
  selector: 'app-front-layoute',
  templateUrl: './front-layoute.component.html',
  styleUrls: ['./front-layoute.component.scss']
})
export class FrontLayouteComponent implements OnInit {
  isSidebarOpen = false;
  data:any
  imagepath:any='http://localhost:3000/'
  helper= new JwtHelperService

    constructor(@Inject(DOCUMENT) private document: Document,private route:Router,private api:ApiService,private auth:AuthontificationService) {


     }
     logout(){
  localStorage.removeItem('token')
  this.route.navigate(['/'])
  this.ngOnInit()
     }

     sidebarToggle(){
  this.isSidebarOpen = !this.isSidebarOpen;
     }

     ngOnInit(): void {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = this.helper.decodeToken(token);
        if (decodedToken.role === 'client' ) {
          decodedToken.role = 'Apprenant';
        }
        this.data = decodedToken;
      }else{this.data=''}
    }


    navigateprofile(){
      switch(this.data.role) {
        case 'admin':
          this.route.navigate(['/admin'])
          break;
        case 'client':
          this.route.navigate(['/client'])
          break;
          case 'centre':
            this.route.navigate(['/centre'])
            break;
        default:
          this.route.navigate(['/login'])
      }

    }


    scrollTop()
    {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
  });

    }

}
