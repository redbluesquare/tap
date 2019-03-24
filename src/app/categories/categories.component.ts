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
  }

  //Delete a category
  deleteCategory(){

  }
  
  //Get the category(s)
  getCategories(id){
    this.apiData.getCategories(id)
    .subscribe(categories => this.categories = categories)
  }

  save(){
    return true;
  }

  ngOnInit() {
    this.getCategories(0);
  }

}
