import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from './../../../../services/crud/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-ajoute-formation',
  templateUrl: './ajoute-formation.component.html',
  styleUrls: ['./ajoute-formation.component.scss']
})
export class AjouteFormationComponent implements OnInit {
  img:any
  errmessage:any
  helper = new JwtHelperService
  selectedCategory:any
  certifiee:any=false
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {
  }

  selectImage(event:any) {
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      console.log(this.img)
      this.img = path;
    }
  }

  centreid(){
    let token:any = localStorage.getItem('token')
    let decodedtoken:any = this.helper.decodeToken(token)
    return decodedtoken.id
  }


  maxDate() {
    const today = new Date().toISOString().split('T')[0];
    return today;
}

certification(){
  this.certifiee=!this.certifiee
}
addformation(f:NgForm){

    let body=f.value
 const formData = new FormData();
 formData.append('titre',body.titre)
 formData.append('discription',body.discription)
 formData.append('img', this.img)
 formData.append('prix',body.prix)
 formData.append('heures',body.heures)
 formData.append('promotion',body.promotion)
 formData.append('date_debut',body.date_debut)
 formData.append('date_fin',body.date_fin)
 formData.append('categorie',body.categorie)
 formData.append('etat',body.etat)
 formData.append('diplome',body.diplome)
 formData.append('certifiee',this.certifiee)


 this.api.addformation(formData,this.centreid()).subscribe(info=>this.router.navigate(['/centre/formation']),(err:HttpErrorResponse)=>this.errmessage=err.error)

   }

   currentCategory: string = '';

   toggleDropdown(event: Event, category: string) {
     event.stopPropagation();

     // Remove show class from current category
     const currentElement = document.querySelector(`.dropdown-submenu[aria-label="${this.currentCategory}"] > ul`);
     if (currentElement) {
       currentElement.classList.remove('show');
     }

     // Add show class to clicked category
     const clickedElement = document.querySelector(`.dropdown-submenu[aria-label="${category}"] > ul`);
     if (clickedElement) {
       clickedElement.classList.add('show');
     }

     this.currentCategory = category;
   }

}
