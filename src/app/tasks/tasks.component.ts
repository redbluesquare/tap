import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  cat_id:number;
  categories:any;
  data:any;
  description:string;
  parent_id:number;
  tasks:any;
  task_id:number;
  title:string;

  constructor(private apiData:DataApiService) { }

  //Add a task
  addTask(){
    this.data = {
      "ddc_task_id":this.task_id,
      "title":this.title,
      "description":this.description,
      "parent_id":this.parent_id,
      "cat_id":this.cat_id
    }
    this.apiData.addTask(this.data).subscribe(task =>this.clearForm())
  }

  clearForm(){
    this.task_id = null;
    this.title = null;
    this.description = null;
    this.parent_id = null;
    this.cat_id = null;
  }

  //Delete a task
  deleteTask(id){
    this.apiData.addTask(this.data).subscribe(task =>this.clearForm())
  }
  
  //Get the task(s)
  getTasks(id){
    this.apiData.getTasks(id)
    .subscribe(tasks => this.tasks = tasks)
  }

  save(){
    this.addTask();
  }


  ngOnInit() {
    this.parent_id = 0;
    this.getTasks(0);
  }

}
