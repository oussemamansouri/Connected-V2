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
  data:any
  token:any

  imagepath:any='http://localhost:3000/'
  helper= new JwtHelperService

    constructor(@Inject(DOCUMENT) private document: Document,private route:Router,private api:ApiService) {}
     logout(){
  localStorage.removeItem('token')
  this.route.navigate(['/'])

     }

    ngOnInit(): void {

  let token:any= localStorage.getItem('token')
  let decodedtoken=this.helper.decodeToken(token)
  this.api.getclient(decodedtoken.id).subscribe(data=>this.data=data)
    }

    sidebarToggle()
    {
      //toggle sidebar function
      this.document.body.classList.toggle('toggle-sidebar');
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
