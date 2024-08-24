import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../../../services/crud/api.service';
import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthontificationService } from 'src/app/services/authontification/authontification.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  mot_clee:any
  searchTerm:any
  categorie:any
  formations:any=[]
  formation:any={date_debut:"",date_fin:"",id:"",titre:"",discription:"",img:"",prix:"",heures:"",promotion:"",categorie:"",etat:"",diplome:"",certifiee:"",createdAt:"",updatedAt:"",CentreId:"",Centre:{}}
  formationid:any
  imagepath:any='http://localhost:3000/'
  helper= new JwtHelperService
  userid:any
  userrole:any
  errmessage:any
  participer:boolean=false
  verif:boolean=true
  verif2:boolean=true
  ebookid:any
  ebook:any={id:'',titre:'',discription:'',auteur:'',format:'',nb_pages:'',img:'',prix:'',promotion:'',book:'',createdAt:'',updatedAt:'',CentreId:''}
  achat:any=[]
  ebooks:any=[]
  isbuy:boolean=false
  Categories='Domaines'
  nbformations:any
  nbebooks:any


  constructor(private api:ApiService,private router:Router,private auth:AuthontificationService,private aroute:ActivatedRoute) { }



  ngOnInit(): void {
    this.searchTerm=this.aroute.snapshot.queryParams['searchTerm']
    this.mot_clee=this.searchTerm
    this.categorie=this.aroute.snapshot.queryParams['categorie']
    this.api.getallformations().subscribe(data=>this.formations=data)
    this.api.getallbooks().subscribe(data=>this.ebooks=data)
    this.removeQueryParams()

    let token:any = localStorage.getItem('token')
    if (token){
  let decodedtoken:any = this.helper.decodeToken(token)
  this.userid=decodedtoken.id
  this.userrole=decodedtoken.role
}
this.filter()

  }

  recherche(){
    this.searchTerm=this.mot_clee
    this.filter()

  }
  removeQueryParams(){

    if (this.categorie)
    {this.Categories=this.categorie
      this.router.navigate([])}
    else{
      this.Categories='Domaines'}
  }



check(auteur:any,id:any){

  if(auteur){
    this.getbookId(id)
  }else if(!auteur){ this.getformationid(id)}
}


  getformationid(id: any) {
    this.formationid = id;
    this.api.getformation(id).subscribe(data =>{this.formation=data
      if (this.formation.certifiee=='true'){
        this.formation.certifiee='Oui'
      }else if (this.formation.certifiee=='false'){
        this.formation.certifiee='Non'
      }
    });

    if (this.userrole == 'client') {
      this.api.getclientparticipation(this.userid).subscribe(data => {
        if (Array.isArray(data) && data.some((participation: any) => participation.FormationId === this.formationid)) {
          // Do something if the user has participated in the formation
          this.participer=true
        }else{this.participer=false}
      });
    }
  }

  getbookId(id:any){
    this.ebookid=id
this.api.getebookbyid(id).subscribe(info=>this.ebook=info)
this.api.getbuyersebook(id).subscribe(data=>this.achat=data)

if (this.userrole == 'client') {
  this.api.getclientachat(this.userid).subscribe(data => {
    if (Array.isArray(data) && data.some((achat: any) => achat.EbookId === this.ebookid)) {
      // Do something if the user has participated in the formation
      this.isbuy=true
    }else{this.isbuy=false}
  });
}
  }


  participation(){
    if (!this.userrole){
      this.verif=true
this.router.navigate(['/login'])
}else{
if (this.userrole=='client'){
let body={
  ClientId:this.userid,
  FormationId:this.formationid
}
this.api.participation(body).subscribe(res=> this.participer=true,(err:HttpErrorResponse)=>this.errmessage=err.error)
}
}
}

annulerparticipation(){

  this.api.deleteparticipation(this.userid,this.formationid).subscribe(res=>{
    this.participer=false
    this.verif=false
    this.ngOnInit()
  })

}

acheter(){
  if (!this.userrole){
    this.verif2=true
this.router.navigate(['/login'])
}else{
if (this.userrole=='client'){
let body={
  ClientId:this.userid,
  EbookId:this.ebookid
}
this.api.acheter(body).subscribe(res=> this.isbuy=true)
}
}

}



getcategorie(category: string){
this.categorie=category
if (this.categorie!=''){
this.Categories=this.categorie
}else{
  this.Categories='Domaines'
}
}

all:boolean=true
formationsonly:boolean=false
enooksonly:boolean=false

change(etat:string){
if (etat=='formationonly'){
  this.all=false
  this.formationsonly=true
  this.enooksonly=false
  this.filter()
}else if(etat=='ebookonly'){
  this.all=false
  this.formationsonly=false
  this.enooksonly=true
  this.filter()
}else{
  this.all=true
this.formationsonly=false
this.enooksonly=false
this.filter()
}

}

filter() {
  let filteredFormations = [];
  let filteredEbooks = [];

  if (!this.searchTerm && !this.categorie) {
    if (this.all) {
      filteredFormations = this.formations.slice().sort((a:any, b:any) => a.titre.localeCompare(b.titre));
      filteredEbooks = this.ebooks.slice().sort((a:any, b:any) => a.titre.localeCompare(b.titre));
    } else if (this.formationsonly) {
      filteredFormations = this.formations.slice().sort((a:any, b:any) => a.titre.localeCompare(b.titre));
    } else if (this.enooksonly) {
      filteredEbooks = this.ebooks.slice().sort((a:any, b:any) => a.titre.localeCompare(b.titre));
    }
  } else {
    const searchWords = this.searchTerm.toLowerCase().split(/[ ,]+/);

    filteredFormations = this.formations.filter((item: any) => {
      const isMatching = searchWords.some((word: string) => (
        item.titre.toLowerCase().includes(word) ||
        item.discription.toLowerCase().includes(word) ||
        item.categorie.toLowerCase().includes(word) ||
        item.diplome.toLowerCase().includes(word) ||
        item.etat.toLowerCase().includes(word) ||
        item.Centre.name.toLowerCase().includes(word) ||
        item.Centre.localisation.toLowerCase().includes(word)
      ));

      return isMatching && (this.categorie ? item.categorie === this.categorie : true);
    }).sort((a:any, b:any) => {
      if (a.titre === b.titre) {
        if (a.discription === b.discription) {
          return a.auteur.localeCompare(b.auteur);
        } else {
          return a.discription.localeCompare(b.discription);
        }
      } else {
        return a.titre.localeCompare(b.titre);
      }
    });

    filteredEbooks = this.ebooks.filter((item: any) => {
      const isMatching = searchWords.some((word: string) => (
        item.titre.toLowerCase().includes(word) ||
        item.discription.toLowerCase().includes(word) ||
        item.categorie.toLowerCase().includes(word) ||
        item.auteur.toLowerCase().includes(word) ||
        item.Centre.name.toLowerCase().includes(word) ||
        item.Centre.localisation.toLowerCase().includes(word)
      ));

      return isMatching && (this.categorie ? item.categorie === this.categorie : true);
    }).sort((a:any, b:any) => {
      if (a.titre === b.titre) {
        if (a.discription === b.discription) {
          return a.auteur.localeCompare(b.auteur);
        } else {
          return a.discription.localeCompare(b.discription);
        }
      } else {
        return a.titre.localeCompare(b.titre);
      }
    });
  }

  // if (this.all) {
  //   return [...filteredFormations, ...filteredEbooks];
  // } else if (this.formationsonly) {
  //   return filteredFormations;
  // } else if (this.enooksonly) {
  //   return filteredEbooks;
  // }

  if (this.all) {
    this.nbformations = filteredFormations.length;
    this.nbebooks = filteredEbooks.length;
    return [...filteredFormations, ...filteredEbooks];
  } else if (this.formationsonly) {
    this.nbformations = filteredFormations.length;
    this.nbebooks = 0;
    return filteredFormations;
  } else if (this.enooksonly) {
    this.nbformations = 0;
    this.nbebooks = filteredEbooks.length;
    return filteredEbooks;
  }

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
