import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from 'src/app/services/crud/api.service';
import { Router } from '@angular/router';

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
  constructor(private api:ApiService,private route:Router) { }

  getId():number{
    let token:any=localStorage.getItem('token')
   let decodedtoken:any=this.helper.decodeToken(token)
    return decodedtoken.id
  }

  ngOnInit(): void {
    this.api.getcentre(this.getId()).subscribe(data=>this.profile=data)
  }

  updateimage(event:any){
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      const formData = new FormData();
      formData.append('img', path)
      this.api.updatecentreimage(formData,this.getId()).subscribe(info=>this.ngOnInit())
    }
  }

  notthesame(){
    if(this.new!=this.repe){
      return true
    }else return false
  }
  message(){
    this.errmessage=''
    this.secmessage=''
  }

  update(f:NgForm){
    let body=f.value
    // const formData = new FormData();

    // formData.append('username',body.username)
    // formData.append('email',body.email)
    // formData.append('img', this.img)
    // formData.append('tel',body.tel)

    this.api.updatecentre(this.getId(),body).subscribe(info=>{
        this.secmessage="Mise à jour terminée avec succès"
      this.ngOnInit()
    },(err:HttpErrorResponse)=>{
      this.errmessage=err.error
    })
      }




  updatepassword(f:NgForm){
    let body=f.value
     this.api.updatecentrepassword(body,this.getId()).subscribe(info=>{
      this.route.navigate(['/centre/dashbord'])
    },(err:HttpErrorResponse)=>{
      this.errmessagepass=err.error
      this.old=""

    })

  }

}
