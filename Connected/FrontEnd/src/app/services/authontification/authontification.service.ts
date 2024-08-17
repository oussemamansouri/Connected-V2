import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthontificationService {


  helper=new JwtHelperService
  constructor(private http:HttpClient) { }




login(body:any){
return this.http.post('http://localhost:3000/login',body)
}

savedata(token:any){
localStorage.setItem('token',token)

}

logedin(): boolean {
  const token = localStorage.getItem('token');
  return !!token && !this.helper.isTokenExpired(token);
}


// loginadmin(){
//   let token:any=localStorage.getItem('token')
//   let decodedtoken:any = this.helper.decodeToken(token)
// if(this.logedin()==true && decodedtoken.role=='admin' ){  return true  }
// else return false
// }

// loginclient(){
//   let token:any=localStorage.getItem('token')
//   let decodedtoken:any = this.helper.decodeToken(token)
// if(this.logedin()==true && decodedtoken.role=='client' ){  return true  }
// else return false
// }
// logincentre(){
//   let token:any=localStorage.getItem('token')
//   let decodedtoken:any = this.helper.decodeToken(token)
// if(this.logedin()==true && decodedtoken.role=='centre' ){  return true  }
// else return false
// }


}
