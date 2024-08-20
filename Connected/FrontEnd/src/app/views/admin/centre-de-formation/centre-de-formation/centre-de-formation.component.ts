import { Router } from '@angular/router';
import { ApiService } from './../../../../services/crud/api.service';
import { Component, OnInit , ElementRef} from '@angular/core';

@Component({
  selector: 'app-centre-de-formation',
  templateUrl: './centre-de-formation.component.html',
  styleUrls: ['./centre-de-formation.component.scss']
})
export class CentreDeFormationComponent implements OnInit {

  profiles:any
  imagepath:any='http://localhost:3000/'
  centreId:any
  searchTerm:any
  constructor(private elementRef: ElementRef,private api:ApiService , private router:Router) { }


  ngOnInit(): void {

    // var s = document.createElement("script");
    // s.type = "text/javascript";
    // s.src = "../../../../../assets/admin/js/main.js";
    // this.elementRef.nativeElement.appendChild(s);


this.api.getcentres().subscribe(data=>
{this.profiles=data
// this.imagepath=this.imagepath + this.profiles.img
})
  }

  deletecentre(){
this.api.deletecentre(this.centreId).subscribe(info=>{
 // console.log(info)
  this.ngOnInit()
})
  }

  selectId(id:any) {
    this.centreId=id
      }

      sendid(id:any) {
        this.router.navigate(['/admin/centre/update'], { queryParams: { centreId: id } });
          }

      detIdcentre(id:any) {
        this.router.navigate(['/admin/centre/details'], { queryParams: { centreId: id } });
      }


      filter() {
        if (!this.searchTerm) {
          return this.profiles;
        }

        return this.profiles.filter((item:any) =>
          item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }

}
