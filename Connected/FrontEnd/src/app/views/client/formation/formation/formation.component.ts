import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../../../services/crud/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {

  searchTerm:any
  formations:any
  formation:any={date_debut:"",date_fin:"",id:"",titre:"",discription:"",img:"",prix:"",heures:"",promotion:"",categorie:"",etat:"",diplome:"",certifiee:"",createdAt:"",updatedAt:"",CentreId:"",Centre:{}}
  formationid:any
  clientid:any
  imagepath:any='http://localhost:3000/'
  participation:any=[]
hepler = new JwtHelperService
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {
let token:any=localStorage.getItem('token')
let decodedtoken:any=this.hepler.decodeToken(token)
 this.clientid=decodedtoken.id
    this.api.getclientparticipation(this.clientid).subscribe(data=>this.formations=data)
  }

  getformationid(id:any){
    this.formationid=id
    this.api.getformation(id).subscribe(data=>{this.formation=data
      if (this.formation.certifiee=='true'){
        this.formation.certifiee='Oui'
      }else if (this.formation.certifiee=='false'){
        this.formation.certifiee='Non'
      }
    })
    // this.api.getparticipant(id).subscribe(info=>this.participation=info)
  }

  deleteparticipation(){
    this.api.deleteparticipation(this.clientid,this.formationid).subscribe(info=>this.ngOnInit())
  }

        filter() {
  if (!this.searchTerm) {
    return this.formations.map((item:any) => item.Formation);
  }

  return this.formations
    .filter((item:any) => item.Formation.titre.toLowerCase().includes(this.searchTerm.toLowerCase()))
    .map((item:any) => item.Formation);
}


}
