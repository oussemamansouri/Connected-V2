import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from './../../../../services/crud/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-ajoute-ebook',
  templateUrl: './ajoute-ebook.component.html',
  styleUrls: ['./ajoute-ebook.component.scss']
})
export class AjouteEbookComponent implements OnInit {
  img:any
  ebook:any
  errmessage:any
  helper = new JwtHelperService
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {
  }

  selectImage(event:any) {
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      this.img = path;
    }
  }

  selectEbook(event:any) {
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      this.ebook = path;
    }
  }

  centreid(){
    let token:any = localStorage.getItem('token')
    let decodedtoken:any = this.helper.decodeToken(token)
    return decodedtoken.id
  }




addebook(f:NgForm){

    let body=f.value
 const formData = new FormData();
 formData.append('titre',body.titre)
 formData.append('discription',body.discription)
 formData.append('img', this.img)
 formData.append('book',this.ebook)
 formData.append('nb_pages',body.nb_pages)
 formData.append('promotion',body.promotion)
 formData.append('prix',body.prix)
 formData.append('categorie',body.categorie)
 formData.append('format',body.format)
 formData.append('auteur',body.auteur)

 this.api.addebookbycentre(formData,this.centreid()).subscribe(info=>this.router.navigate(['/centre/ebook']),(err:HttpErrorResponse)=>this.errmessage=err.error)

   }


}
