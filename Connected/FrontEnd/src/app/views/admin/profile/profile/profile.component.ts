import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './../../../../services/crud/api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  profile:any
  img:any
  imagepath:any='http://localhost:3000/'
  old=""
  new=""
  repe=""
  errmessage:any
  secmessage:any
  errmessagepass:any
  secmessagepass:any

helper= new JwtHelperService
  constructor( private api:ApiService,private route:Router) {
  }

  ngOnInit(): void {
   this.api.getadmin().subscribe(data=>this.profile=data)

  }

  notthesame(){
    if(this.new!=this.repe){
      return true
    }else return false
  }

  updateimage(event:any){
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      const formData = new FormData();
      formData.append('img', path)
      this.api.updateaadminimage(formData,this.getId()).subscribe(info=>this.ngOnInit())
    }
  }

  getId():number{
    let token:any=localStorage.getItem('token')
   let decodedtoken:any=this.helper.decodeToken(token)
    return decodedtoken.id
  }

  update(f:NgForm){
let body=f.value
// const formData = new FormData();

// formData.append('username',body.username)
// formData.append('email',body.email)
// formData.append('img', this.img)
// formData.append('tel',body.tel)

this.api.updateadmin(body,this.getId()).subscribe(info=>{
  console.log(info)
  this.api.getadmin().subscribe(data=>{
    {this.secmessage="Mise à jour terminée avec succès"
  this.ngOnInit()}
  })

},(err:HttpErrorResponse)=>{
  this.errmessage=err.error
})
  }

  message(){
    this.errmessage=''
    this.secmessage=''

  }




updatepassword(f:NgForm){
  let body=f.value
   this.api.updatepassword(body,this.getId()).subscribe(info=>{

    this.route.navigate(['/admin/dashbord'])


  },(err:HttpErrorResponse)=>{
    this.errmessagepass=err.error
    this.old=""

  })

}

}
