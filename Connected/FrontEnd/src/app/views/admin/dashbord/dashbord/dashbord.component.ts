import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/crud/api.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {
  counts: any = {}; // Object to store various counts fetched from the API

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    // Fetch counts from the API when the component initializes
    this.api.getcounts().subscribe(data => {
      this.counts = data; // Assign the fetched data to the counts property
    });
  }
}
