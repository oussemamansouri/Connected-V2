import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../../../services/crud/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-ebook',
  templateUrl: './ebook.component.html',
  styleUrls: ['./ebook.component.scss']
})
export class EbookComponent implements OnInit {
  searchTerm:any
  ebooks:any
  imagepath:any='http://localhost:3000/'
  ebookid:any
  achat:any=[]
  ebook:any={id:'',titre:'',discription:'',auteur:'',format:'',nb_pages:'',img:'',prix:'',promotion:'',book:'',createdAt:'',updatedAt:'',CentreId:''}
  hepler = new JwtHelperService
  constructor(private api:ApiService,private router:Router) { }


  ngOnInit(): void {
    let token:any=localStorage.getItem('token')
let decodedtoken:any=this.hepler.decodeToken(token)
let centreid=decodedtoken.id
    this.api.getcentreebooks(centreid).subscribe(data=>this.ebooks=data)
  }
  getbookId(id:any){
    this.ebookid=id
this.api.getebookbyid(id).subscribe(info=>this.ebook=info)
this.api.getbuyersebook(id).subscribe(data=>this.achat=data)
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

  deleteebook(){
    this.api.deleteebook(this.ebookid).subscribe(info=>this.ngOnInit())
      }
      sendid(){
        this.router.navigate(['/centre/ebook/update'],{queryParams:{ebookId:this.ebookid}})
      }
      sendebookid(){
        this.router.navigate(['/centre/ebook/buys'],{queryParams:{ebookId:this.ebookid}})
      }


      filter() {
        if (!this.searchTerm) {
          return this.ebooks;
        }

        return this.ebooks.filter((item:any) =>
          item.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }

}
