import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../../../services/crud/api.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-update-ebook',
  templateUrl: './update-ebook.component.html',
  styleUrls: ['./update-ebook.component.scss']
})
export class UpdateEbookComponent implements OnInit {
  ebook:any={}
  ebookid:any
errmessage:any
book:any
helper = new JwtHelperService
  constructor(private api:ApiService,private param:ActivatedRoute,private router:Router) { }

  convertDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.ebookid=this.param.snapshot.queryParams['ebookId']
    this.api.getebookbyid(this.ebookid).subscribe(data=>{this.ebook=data
    })
  }

  selectEbook(event:any) {
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      this.book = path;
    }
  }

      centreid(){
        let token:any = localStorage.getItem('token')
        let decodedtoken:any = this.helper.decodeToken(token)
        return decodedtoken.id
      }

      updateebook(f:NgForm){

        let body=f.value
     const formData = new FormData();
     formData.append('titre',body.titre)
     formData.append('discription',body.discription)
     formData.append('book',this.book)
     formData.append('nb_pages',body.nb_pages)
     formData.append('promotion',body.promotion)
     formData.append('prix',body.prix)
     formData.append('format',body.format)
     formData.append('auteur',body.auteur)
     formData.append('categorie',body.categorie)

     this.api.updateebook(this.ebookid,formData).subscribe(info=>this.router.navigate(['/centre/ebook']),(err:HttpErrorResponse)=>this.errmessage=err.error)

       }

}
