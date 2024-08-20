import { ApiService } from './../../../../services/crud/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cetre-details',
  templateUrl: './cetre-details.component.html',
  styleUrls: ['./cetre-details.component.scss']
})
export class CetreDetailsComponent implements OnInit {
  participation:any=[]
  buys:any=[]
  profile:any
  formations:any=[]
  ebooks:any=[]
  ebookid:any
  formationid:any
  CentreId:any
  formation:any={date_debut:"",date_fin:"",id:"",titre:"",discription:"",img:"",prix:"",heures:"",promotion:"",categorie:"",etat:"",diplome:"",certifiee:"",createdAt:"",updatedAt:"",CentreId:"",Centre:{}}
  ebook:any={id:'',titre:'',discription:'',auteur:'',format:'',nb_pages:'',img:'',prix:'',promotion:'',book:'',createdAt:'',updatedAt:'',CentreId:'',}
  imagepath:any='http://localhost:3000/'

  constructor(private aroute:ActivatedRoute,private api:ApiService,private router:Router) { }

  ngOnInit(): void {

  this.CentreId = this.aroute.snapshot.queryParams['centreId']
this.api.getcentre(this.CentreId).subscribe(info=>this.profile=info)
this.api.getcentreformations(this.CentreId).subscribe(info=>this.formations=info)
this.api.getcentreebooks(this.CentreId).subscribe(info=>this.ebooks=info)

  }

  updateimage(event:any){
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      const formData = new FormData();
      formData.append('img', path)
      this.api.updatecentreimage(formData,this.CentreId).subscribe(info=>this.ngOnInit())
    }
  }

  sendid2(){
    this.router.navigate(['/admin/ebook/buys'],{queryParams:{ebookId:this.ebookid}})
  }

  getbookId(id:any){
    this.ebookid=id
this.api.getebookbyid(id).subscribe(info=>this.ebook=info)
this.api.getbuyersebook(id).subscribe(data=>this.buys=data)
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
    this.api.getparticipant(id).subscribe(info=>this.participation=info)
  }

  deleteebook(){
this.api.deleteebook(this.ebookid).subscribe(info=>this.ngOnInit())

  }
  sendid(){
this.router.navigate(['/admin/formation/update'],{queryParams: {formationId:this.formationid}});

  }

  deleteformation(){
    this.api.deleteformation(this.formationid).subscribe(info=>this.ngOnInit())
  }

  sendformationid(){
    this.router.navigate(['/admin/formation/participants'],{queryParams:{formationId:this.formationid}})
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

  sendebookid(){
    this.router.navigate(['/admin/ebook/update'],{queryParams:{ebookId:this.ebookid}})
  }
  sendidcentre() {
    this.router.navigate(['/admin/centre/update'],{queryParams:{centreId:this.CentreId}})
      }

      deletecentre(){
        this.api.deletecentre(this.CentreId).subscribe(info=>{
          this.ngOnInit()
        })
          }

}
