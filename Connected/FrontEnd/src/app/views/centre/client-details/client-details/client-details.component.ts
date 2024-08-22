import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../../services/crud/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  clientId:any
  dataclient:any
  imagepath:any='http://localhost:3000/'
  participation:any=[]
  participants:any=[]
  achat:any=[]
  formationid:any
  formation:any={date_debut:"",date_fin:"",id:"",titre:"",discription:"",img:"",prix:"",heures:"",promotion:"",categorie:"",etat:"",diplome:"",certifiee:"",createdAt:"",updatedAt:"",CentreId:"",Centre:{}}
  buys:any=[]
  ebookid:any
  helper = new JwtHelperService

  ebook:any={id:'',titre:'',discription:'',auteur:'',format:'',nb_pages:'',img:'',prix:'',promotion:'',book:'',createdAt:'',updatedAt:'',CentreId:''}

  constructor(private route:ActivatedRoute,private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    let token:any =localStorage.getItem('token')
    let decodedtoken:any=this.helper.decodeToken(token)
    this.clientId=this.route.snapshot.queryParams['clientId']

this.api.getclient(this.clientId).subscribe(data=>this.dataclient=data)
this.api.getparticipationbycentre(this.clientId,decodedtoken.id).subscribe(data=>{this.participation=data})
this.api.getachatforcentre(this.clientId,decodedtoken.id).subscribe(data=>this.achat=data)
  }


  sendid2(){
    this.router.navigate(['/centre/ebook/buys'],{queryParams:{ebookId:this.ebookid}})
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
    this.api.getparticipant(id).subscribe(info=>this.participants=info)
  }

  deleteformation(){
    this.api.deleteparticipation(this.clientId,this.formationid).subscribe(info=>this.ngOnInit())
  }

  getbookId(id:any){
    this.ebookid=id
this.api.getebookbyid(id).subscribe(info=>{this.ebook=info})
this.api.getbuyersebook(id).subscribe(data=>this.buys=data)
  }

  deleteebook(){
    this.api.deleteachatclient(this.clientId,this.ebookid).subscribe(info=>this.ngOnInit())
      }

  downloadebook() {
    this.api.downloadebook(this.ebookid).subscribe((blob) => {
      const fileName = `Ebook.${this.ebook.format}`;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // remove the element
    });
  }

  sendformationid(){
    this.router.navigate(['/centre/formation/update'],{queryParams:{formationId:this.formationid}})
  }
  sendebookid(){
    this.router.navigate(['/centre/ebook/update'],{queryParams:{ebookId:this.ebookid}})
  }
  sendid(){
    this.router.navigate(['/centre/formation/participants'],{queryParams:{formationId:this.formationid}})
      }


}
