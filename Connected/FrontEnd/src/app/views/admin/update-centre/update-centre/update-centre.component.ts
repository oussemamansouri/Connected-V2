import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../../services/crud/api.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-centre',
  templateUrl: './update-centre.component.html',
  styleUrls: ['./update-centre.component.scss']
})
export class UpdateCentreComponent implements OnInit {

centre:any
centreId:any

  constructor(private api:ApiService,private router:Router,private param:ActivatedRoute) { }

  ngOnInit(): void {
this.centreId=this.param.snapshot.queryParams['centreId']
this.api.getcentre(this.centreId).subscribe(data=>{this.centre=data})
  }

  // selectImage(event:any) {
  //   if (event.target.files.length > 0) {
  //     const path = event.target.files[0];
  //     // console.log(path)
  //     this.img = path;
  //   }
  // }

  updatecentre(f:NgForm){

    let body=f.value
//  const formData = new FormData();
//  formData.append('name',body.name)
//  formData.append('email',body.email)
//  formData.append('img', this.img)
//  formData.append('tel',body.tel)
//  formData.append('site',body.site)
//  formData.append('services',body.services)
//  formData.append('fiscale',body.fiscale)
//  formData.append('license',body.license)
//  formData.append('nom_manager',body.nom_manager)
//  formData.append('prenom_manager',body.prenom_manager)
//  formData.append('tel_manager',body.tel_manager)
//  formData.append('localisation',body.localisation)
//  formData.append('facebook',body.facebook)
//  formData.append('linkedin',body.linkedin)
//  formData.append('instagram',body.instagram)
//  formData.append('twitter',body.twitter)

 this.api.updatecentre(this.centreId,body).subscribe(info=>this.router.navigate(['/admin/centre/details'],{ queryParams: { centreId: this.centreId } }))
   }

}
