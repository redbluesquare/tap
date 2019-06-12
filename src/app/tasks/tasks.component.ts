import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  auto_step:number;
  cat_id:number;
  categories:any;
  cats:any;
  data:any;
  ddc_tpd_id:number;
  description:string;
  identifier:string;
  parent_id:number;
  process_link:string
  searchText:string;
  tasks:any;
  task_detail:string;
  task_id:number;
  task_step:number=0;
  title:string;
  tsks:any;
  taskpds:any;
  var1_active:number;
  var1_description:string;
  var2_active:number;
  var2_description:string;
  var3_active:number;
  var3_description:string;

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
      "cat_id":this.cat_id,
      "var1_active":this.var1_active,
      "var1_description":this.var1_description,
      "var2_active":this.var2_active,
      "var2_description":this.var2_description,
      "var3_active":this.var3_active,
      "var3_description":this.var3_description,
      "process_link":this.process_link,
      "auto_step":this.auto_step
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
    this.auto_step = null;
    this.process_link = null;
    this.var1_active = null;
    this.var1_description = null;
    this.var2_active = null;
    this.var2_description = null;
    this.var3_active = null;
    this.var3_description = null;
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
    this.auto_step = tpd.auto_step;
    this.process_link = tpd.process_link;
    this.var1_active = tpd.var1_active;
    this.var1_description = tpd.var1_description;
    this.var2_active = tpd.var2_active;
    this.var2_description = tpd.var2_description;
    this.var3_active = tpd.var3_active;
    this.var3_description = tpd.var3_description;
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
