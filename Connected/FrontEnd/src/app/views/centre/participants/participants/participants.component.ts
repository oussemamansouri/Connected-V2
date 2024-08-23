import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../../services/crud/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {
  clients:any
  clientid:any
  formationid:any
  searchTerm:any

  constructor(private router:Router, private api:ApiService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.formationid=this.route.snapshot.queryParams['formationId']
    this.api.getparticipant(this.formationid).subscribe(data=>this.clients=data)
  }

  sendId(id:any){
    this.router.navigate(['/centre/client/details'],{queryParams:{clientId : id}})
      }

          getclientid(id:any){
            this.clientid=id
              }

              deleteparticipant(){
                this.api.deleteparticipant(this.clientid,this.formationid).subscribe(info=>this.ngOnInit())
                  }


                  filter() {
                    if (!this.searchTerm) {
                       return this.clients.rows;
                    }

                    const filteredClients = this.clients.rows.filter((client: any) => {
                       const firstNameMatch = client.Client.firstname.toLowerCase().includes(this.searchTerm.toLowerCase());
                       const lastNameMatch = client.Client.lastname.toLowerCase().includes(this.searchTerm.toLowerCase());

                       return firstNameMatch || lastNameMatch;
                    });

                    return filteredClients;
                 }

}
