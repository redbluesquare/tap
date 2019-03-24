import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  about:any;
  data:any;
  categories:any;
  cat_id:number;
  task_id:number;
  title:string;
  description:string;
  parent_id:number;
  usertasks:any;

  constructor(private apiData:DataApiService) { }

  //Add a category
  addUwd(){
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

  start(id){
    console.log(2)
  }

  stop(id){
    console.log(2*2)
  }

  ngOnInit() {
    this.about = this.apiData.getUsertasks()
    .subscribe(ut => this.usertasks = ut)

  }

}
