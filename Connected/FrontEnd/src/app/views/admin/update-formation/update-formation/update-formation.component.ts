import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../../../services/crud/api.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-formation',
  templateUrl: './update-formation.component.html',
  styleUrls: ['./update-formation.component.scss']
})
export class UpdateFormationComponent implements OnInit {

  formation:any={}
  formationid:any
errmessage:any
certifiee:any=false
  constructor(private api:ApiService,private param:ActivatedRoute,private router:Router) { }

  convertDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  ngOnInit(): void {
    this.formationid=this.param.snapshot.queryParams['formationId']
    this.api.getformation(this.formationid).subscribe(data=>{this.formation=data
    })
    console.log(this.formation.date_debut)

  }

  Date() {
    const today = new Date().toISOString().split('T')[0];
    return today;
}

certification(){
  this.certifiee=!this.certifiee
}




  // updateformation(f:NgForm){
  //   this.api.updateformation(this.formationid,f.value).subscribe(info=>
  //   this.router.navigate(['/admin/formation']),(err:HttpErrorResponse)=>this.errmessage=err.error)
  //     }


      updateformation(f: NgForm) {
        let body = f.value;
        body.certifiee = this.certifiee.toString(); // convert boolean to string
        this.api.updateformation(this.formationid, body).subscribe(
          info => this.router.navigate(['/admin/formation']),
          err => this.errmessage = err.error
        );
      }


  }

