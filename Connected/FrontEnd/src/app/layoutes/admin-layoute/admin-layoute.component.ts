import { ApiService } from './../../services/crud/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Component, OnInit,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
@Component({
  selector: 'app-admin-layoute',
  templateUrl: './admin-layoute.component.html',
  styleUrls: ['./admin-layoute.component.scss']
})
export class AdminLayouteComponent implements OnInit {

data:any
token:any
imagepath:any='http://localhost:3000/'
helper= new JwtHelperService
  constructor(@Inject(DOCUMENT) private document: Document,private route:Router,private api:ApiService) {
    this.api.getadmin().subscribe(info=>{
      this.data=info
    })

   }
   logout(){
localStorage.removeItem('token')
this.route.navigate(['/'])

   }


  ngOnInit(): void {

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
