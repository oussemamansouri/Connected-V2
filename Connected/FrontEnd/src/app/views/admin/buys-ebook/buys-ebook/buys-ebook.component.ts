import { ApiService } from './../../../../services/crud/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buys-ebook',
  templateUrl: './buys-ebook.component.html',
  styleUrls: ['./buys-ebook.component.scss']
})
export class BuysEbookComponent implements OnInit {
  clients:any
  clientid:any
  ebookid:any
  searchTerm:any
  constructor(private router:Router,private api:ApiService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.ebookid=this.route.snapshot.queryParams['ebookId']
    this.api.getbuyersebook(this.ebookid).subscribe(data=>this.clients=data)
  }

  sendId(id:any){
    this.router.navigate(['/admin/client/details'],{queryParams:{clientId : id}})
      }

      getclientid(id:any){
        this.clientid=id
          }

          deleteachat(){
            this.api.deleteachat(this.clientid,this.ebookid).subscribe(info=>this.ngOnInit())
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
