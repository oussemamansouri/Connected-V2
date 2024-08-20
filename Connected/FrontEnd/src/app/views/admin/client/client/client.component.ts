import { Router } from '@angular/router';
// import { Subscription } from 'rxjs';
import { ApiService } from './../../../../services/crud/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  searchTerm:any
  clients:any
  clientid:any
  // ob!:Subscription
  // ob2!:Subscription
  constructor(private api:ApiService, private router:Router) { }


  ngOnInit(): void {
   this.api.getclients().subscribe(info=>this.clients=info)
  }

  getclientid(id:any){
this.clientid=id
  }

  sendId(id:any){
this.router.navigate(['/admin/client/details'],{queryParams:{clientId : id}})

  }
  sendclientId(id:any){
    this.router.navigate(['/admin/client/update'],{queryParams:{clientId : id}})
      }

  deleteclient(){
    this.api.deleteclient(this.clientid).subscribe(info=>this.ngOnInit())

  }


  filter() {
    if (!this.searchTerm) {
      return this.clients;
    }

    const filteredClients = this.clients.filter((client: any) => {
      const firstNameMatch = client.firstname.toLowerCase().includes(this.searchTerm.toLowerCase());
      const lastNameMatch = client.lastname.toLowerCase().includes(this.searchTerm.toLowerCase());

      return firstNameMatch || lastNameMatch;
    });

    return filteredClients;
  }


  // ngOnDestroy(): void {
  //   this.ob.unsubscribe()
  //   this.ob2.unsubscribe()
  // }

}
