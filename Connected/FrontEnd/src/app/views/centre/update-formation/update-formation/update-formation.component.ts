import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../../../services/crud/api.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

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
  certification(){
    this.certifiee=!this.certifiee
  }

  Date() {
    const today = new Date().toISOString().split('T')[0];
    return today;
}




updateformation(f: NgForm) {
  let body = f.value;
  body.certifiee = this.certifiee.toString(); // convert boolean to string
  this.api.updateformation(this.formationid, body).subscribe(
    info => this.router.navigate(['/centre/formation']),
    err => this.errmessage = err.error
  );
}

}
