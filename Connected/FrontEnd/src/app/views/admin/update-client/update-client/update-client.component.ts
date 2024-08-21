import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../../services/crud/api.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss']
})
export class UpdateClientComponent implements OnInit {

  client:any
clientId:any
errmessage:any

  constructor(private api:ApiService,private router:Router,private param:ActivatedRoute) { }

  ngOnInit(): void {
    this.clientId=this.param.snapshot.queryParams['clientId']
    this.api.getclient(this.clientId).subscribe(data=>{this.client=data})
  }

  maxDate() {
    const today = new Date().toISOString().split('T')[0];
    return today;
}


  updateclient(f:NgForm){
    let body=f.value
 this.api.updateclient(this.clientId,body).subscribe(info=>this.router.navigate(['/admin/client/details'],{ queryParams: { clientId: this.clientId } }),(err:HttpErrorResponse)=>this.errmessage=err.error)
   }

}
