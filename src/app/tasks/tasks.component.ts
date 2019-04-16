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
  cats:any;
  data:any;
  description:string;
  identifier:string;
  parent_id:number;
  searchText:string;
  tasks:any;
  task_detail:string;
  task_id:number;
  task_step:number=0;
  title:string;
  ddc_tpd_id:number;
  tsks:any;
  taskpds:any;

  constructor(private apiData:DataApiService) { }

  //Add a task
  addTask(){
    if(this.task_id == undefined){
      this.task_id = 0;
    }
    if(this.identifier == undefined){
      this.identifier = '';
    }
    if(this.description == undefined){
      this.description = '';
    }
    if(this.parent_id == undefined){
      this.parent_id = 0;
    }
    if(this.cat_id == undefined){
      this.cat_id = 0;
    }
    this.data = {
      "ddc_task_id":this.task_id,
      "identifier":this.identifier,
      "title":this.title,
      "description":this.description,
      "parent_id":this.parent_id,
      "cat_id":this.cat_id
    }
    this.apiData.addTask(this.data).subscribe(task => this.clearForm())
  }

  //Add a task
  addTaskProcessStep(){
    if(this.ddc_tpd_id == undefined){
      this.ddc_tpd_id = 0;
    }
    if(this.task_step == undefined){
      this.task_step = 0;
    }
    if(this.task_detail == undefined){
      this.task_detail = '';
    }
    this.data = {
      "ddc_tpd_id":this.ddc_tpd_id,
      "task_step":this.task_step,
      "task_detail":this.task_detail,
      "task_id":this.task_id
    }
    this.apiData.addTaskProcessStep(this.data).subscribe(task => this.clearTPDForm())
  }

  clearForm(){
    this.task_id = null;
    this.identifier = null;
    this.title = null;
    this.description = null;
    this.parent_id = null;
    this.cat_id = null;
    this.getTasks(0);
    this.getTsks(0);
  }

  clearTPDForm(){
    this.ddc_tpd_id = null;
    this.task_step = null;
    this.task_detail = null;
    this.getTasks(this.task_id);
  }

  //Delete a task
  deleteTask(){
    this.apiData.deleteTask(this.task_id).subscribe(task =>this.clearForm())
  }
  //Delete a task
  deleteTaskPD(){
    this.apiData.deleteTaskPD(this.ddc_tpd_id).subscribe(tpd =>this.clearTPDForm())
  }

  editTask(task){
    this.task_id = task.ddc_task_id;
    this.identifier = task.identifier;
    this.title = task.title;
    this.description = task.description;
    this.parent_id = task.parent_id;
    this.cat_id = task.cat_id;
    this.taskpds = task.process;
  }

  editTaskPD(tpd){
    this.ddc_tpd_id = tpd.ddc_tpd_id;
    this.task_step = tpd.task_step;
    this.task_detail = tpd.task_detail;
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

  //Get the task(s)
  getTasks(id){
    this.apiData.getTasks(id)
    .subscribe(tasks => this.tasks = tasks)
  }

  //Get the task(s)
  getTsks(id){
    this.apiData.getTasks(id)
    .subscribe(tsks => this.tsks = tsks)
  }

  save(){
    this.addTask();
  }

  saveTPD(){
    this.addTaskProcessStep()
  }


  ngOnInit() {
    this.parent_id = 0;
    this.cat_id = 0;
    this.getTasks(0);
    this.getTsks(0);
    this.getCats(0);
  }

}
