import { HttpErrorResponse } from '@angular/common/http';
import { AuthontificationService } from './../../../../services/authontification/authontification.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  token:any
  errmessage:any
    data:any
    // url:any
    helper=new JwtHelperService
    constructor(private auth:AuthontificationService,private route:Router,private act:ActivatedRoute) { }

    ngOnInit(): void {
      // this.url=this.act.snapshot.queryParams['backurl']
      if(this.auth.logedin()==true){
        this.token=localStorage.getItem('token')
        let decodeToken = this.helper.decodeToken(this.token)
        switch(decodeToken.role) {
          case 'admin':
            this.route.navigate(['/admin'])
            break;
          case 'client':
            this.route.navigate(['/client'])
            break;
            case 'centre':
              this.route.navigate(['/centre'])
              break;
          default:
            this.route.navigate(['/login'])
        }
      }
    }

    loginuser(f:any){
      let body=f.value
      this.auth.login(body).subscribe(res=>{
        this.data=res
        this.auth.savedata(this.data.token.token)
        let decodeToken = this.helper.decodeToken(this.data.token.token)
        // if (this.url){this.route.navigate([this.url])}

        switch(decodeToken.role) {
          case 'admin':
            this.route.navigate(['/admin'])
            break;
          case 'client':
            this.route.navigate(['/client'])
            break;
            case 'centre':
              this.route.navigate(['/centre'])
              break;
          default:
            this.route.navigate(['/login'])
        }

      },(err:HttpErrorResponse)=>this.errmessage=err.error)
    }

}
