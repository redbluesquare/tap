import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories:any;
  cat_id:number;
  cats:any;
  data:any;
  title:string;
  description:string;
  parent_id:number;


  constructor(private apiData:DataApiService) { }

  //Add a category
  addCategory(){
    this.data = {
      "ddc_category_id":this.cat_id,
      "title":this.title,
      "description":this.description,
      "parent_id":this.parent_id
    }
    this.apiData.addCategory(this.data).subscribe(category =>this.clearForm())
  }

  clearForm(){
    this.cat_id = null;
    this.title = null;
    this.description = null;
    this.parent_id = null;
    this.getCategories(0);
    this.getCats(0);
  }

  //Delete a category
  deleteCategory(){
    this.apiData.deleteCategory(this.cat_id)
    .subscribe(cat => this.clearForm())
  }


  editCategory(category){
    this.cat_id = category.ddc_category_id;
    this.title = category.title;
    this.description = category.description;
    this.parent_id = category.parent_id;
  }
  
  //Get the category(s)
  getCategories(id){
    this.apiData.getCategories(id)
    .subscribe(categories => this.categories = categories)
  }

  //Get the category(s)
  getCats(id){
    this.apiData.getCategories(id)
    .subscribe(cats => this.cats = cats)
  }

  save(){
    this.addCategory();
  }

  ngOnInit() {
    this.parent_id = 0;
    this.getCategories(0);
    this.getCats(0);
  }

}
