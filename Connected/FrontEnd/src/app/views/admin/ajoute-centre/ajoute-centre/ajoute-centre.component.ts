import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from './../../../../services/crud/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajoute-centre',
  templateUrl: './ajoute-centre.component.html',
  styleUrls: ['./ajoute-centre.component.scss']
})
export class AjouteCentreComponent implements OnInit {
  img:any
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

  addcentre(f:NgForm){

   let body=f.value
const formData = new FormData();

formData.append('name',body.name)
formData.append('email',body.email)
formData.append('img', this.img)
formData.append('password',body.password)
formData.append('tel',body.tel)
formData.append('site',body.site)
formData.append('services',body.services)
formData.append('fiscale',body.fiscale)
formData.append('license',body.license)
formData.append('nom_manager',body.nom_manager)
formData.append('prenom_manager',body.prenom_manager)
formData.append('tel_manager',body.tel_manager)
formData.append('localisation',body.localisation)
formData.append('facebook',body.facebook)
formData.append('linkedin',body.linkedin)
formData.append('instagram',body.instagram)
formData.append('twitter',body.twitter)



this.api.registrecentre(formData).subscribe(info=>this.router.navigate(['/admin/centre']),(err)=>this.errmessage='Ce email est déjà utilisé')
  }

}
