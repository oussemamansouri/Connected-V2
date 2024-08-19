import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from './../../../../services/crud/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajoute-client',
  templateUrl: './ajoute-client.component.html',
  styleUrls: ['./ajoute-client.component.scss']
})
export class AjouteClientComponent implements OnInit {
img:any
cv:any
errmessage:any
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {
  }

  selectImage(event:any) {
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      // console.log(path)
      this.img = path;
    }
  }
  selectCv(event:any) {
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      // console.log(path)
      this.cv = path;
    }
  }

  maxDate() {
    const today = new Date().toISOString().split('T')[0];
    return today;
}

  addclient(f:NgForm){

    let body=f.value
 const formData = new FormData();


 formData.append('firstname',body.firstname)
 formData.append('lastname',body.lastname)
 formData.append('img', this.img)
 formData.append('cv', this.cv)
 formData.append('email',body.email)
 formData.append('password',body.password)
 formData.append('portfolio',body.portfolio)
 formData.append('tel',body.tel)
 formData.append('facebook',body.facebook)
 formData.append('linkedin',body.linkedin)
 formData.append('instagram',body.instagram)
 formData.append('twitter',body.twitter)
 formData.append('address',body.address)
 formData.append('dob',body.dob)
 this.api.registreclient(formData).subscribe(info=>this.router.navigate(['/admin/client']),(err:HttpErrorResponse)=>this.errmessage=err.error)

   }

}
