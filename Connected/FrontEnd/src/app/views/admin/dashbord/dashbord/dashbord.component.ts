import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/crud/api.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {
  counts:any={}

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getcounts().subscribe(data=>{this.counts=data
      console.log(this.counts)}
      )


    // var s = document.createElement("script");
    // s.type = "text/javascript";
    // s.src = "../../../../../assets/admin/js/main.js";
    // this.elementRef.nativeElement.appendChild(s);
  }



}
