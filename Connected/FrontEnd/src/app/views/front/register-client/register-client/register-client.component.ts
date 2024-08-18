import { Router } from '@angular/router';
import { ApiService } from './../../../../services/crud/api.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.scss']
})
export class RegisterClientComponent implements OnInit {
errormessage:any


  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  maxDate() {
    const today = new Date().toISOString().split('T')[0];
    return today;
}



  register(f: NgForm) {

    let body=new FormData
    body.append('firstname',f.value.firstname)
    body.append('lastname',f.value.lastname)
    body.append('email',f.value.email)
    body.append('tel',f.value.tel)
    body.append('address',f.value.address)
    body.append('dob',f.value.dob)
    body.append('password',f.value.password)
    this.api.registreclient(body)
      .subscribe(response => this.router.navigate(['/login']),(err)=>{
        this.errormessage='Ce email est déjà utilisé'
      });

  }
}
