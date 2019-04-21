import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../data-api.service';


@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {

  cat_id:number;
  categories:any;
  comment:string;
  user_id:string;
  created_on:string;
  data:any;
  ddc_tp_id:number;
  description:string;
  filteredTasks:any;
  parent_id:number;
  planned_start:string;
  planstate:number = 0;
  priority:number;
  responsible:string;
  searchText:string;
  taskplans:any;
  tasks:any;
  task_title:string;
  task_id:number;
  title:string;
  tsks:any;

  constructor(private apiData:DataApiService) { }
  
  assignTask(id){
    this.data = {"ddc_task_id":id}
    this.apiData.addTaskplan(this.data)
    .subscribe(tasks => this.getTaskplans(0))
  }

  clearForm(){
    this.comment = null;
    this.ddc_tp_id = null;
    this.task_title = null;
    this.priority = null;
    this.created_on = null;
    this.user_id = null;
    this.planned_start = null;
    this.responsible = null;
    this.planstate = 0;
    this.getTaskplans(0);
  }
  
  //Get the task(s)
  getTaskplans(id){
    this.apiData.getTaskplans(id)
    .subscribe(tps => this.taskplans = tps)
  }
  
  //Get the task(s)
  getTasks(id){
    this.apiData.getTasks(id)
    .subscribe(tasks => this.tasks = tasks)
  }

  getTP(tp){
    this.comment = tp.comment;
    this.ddc_tp_id = tp.ddc_tp_id;
    this.task_title = tp.task_title;
    this.priority = tp.priority;
    this.created_on = tp.created_on;
    this.user_id = tp.user_id;
    if(tp.planned_date!=""){
      this.planned_start = tp.planned_date.split(" ")[1];
    }
    this.responsible = tp.responsible;
    this.planstate = 1;
  }

  removeTP(tp){
    this.apiData.deleteTaskPlan(tp.ddc_tp_id)
    .subscribe(tp => this.clearForm())
  }

  updateTP(){
    this.data = {
      "comment":this.comment,
      "ddc_tp_id":this.ddc_tp_id,
      "priority":this.priority,
      "planned_start":this.planned_start,
      "responsible":this.responsible
    }
    this.apiData.updateTP(this.data)
    .subscribe(tp => this.clearForm())
  }

  ngOnInit() {
    this.getTasks(0);
    this.getTaskplans(0);
  }

}
