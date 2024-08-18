import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private Router:Router) { }

  ngOnInit(): void {
  }

  currentCategory: string = '';

  toggleDropdown(event: Event, category: string) {
    event.stopPropagation();

    // Remove show class from current category
    const currentElement = document.querySelector(`.dropdown-submenu[aria-label="${this.currentCategory}"] > ul`);
    if (currentElement) {
      currentElement.classList.remove('show');
    }

    // Add show class to clicked category
    const clickedElement = document.querySelector(`.dropdown-submenu[aria-label="${category}"] > ul`);
    if (clickedElement) {
      clickedElement.classList.add('show');
    }

    this.currentCategory = category;
  }

  categorie:string=''
  getcategorie(category: string){
this.categorie=category
this.sendinfo()
  }

  searchTerm:string=''


  sendinfo(){
this.Router.navigate(['/search'],{queryParams:{categorie:this.categorie,searchTerm:this.searchTerm}})
  }

}
