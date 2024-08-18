import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from './../../../../services/crud/api.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-center',
  templateUrl: './register-center.component.html',
  styleUrls: ['./register-center.component.scss']
})
export class RegisterCenterComponent implements OnInit {
  errmessage: any
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }
  registre(f: NgForm) {
    let body = f.value
    this.api.registrecentre(body).subscribe(info => this.router.navigate(['/login']), (err: HttpErrorResponse) => this.errmessage = 'Ce email est déjà utilisé')
  }

}
