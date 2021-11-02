import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  categories: Category[] = [];
  categorySelected?: Category;

  constructor(private appDataService: DataServiceService) { }

  ngOnInit(): void {
    this.categories = this.appDataService.getCategories();
  }

  CategorySelected(category: Category){
    this.categorySelected = category;
  }

}
