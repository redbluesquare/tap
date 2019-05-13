import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../data-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  action_qty:number=0;
  data:any;
  categories:any;
  cat_id:number;
  task_id:number;
  taskplans:any;
  taskpds:any;
  title:string;
  tsk:any;
  tskplans:any;
  description:string;
  parent_id:number;
  show_process:number=0;
  usertasks:any;
  my_date:any;

  constructor(private apiData:DataApiService, 
    private router:Router) { }

  actionTask(id, action, task_id){
    this.data = {
      "ddc_tp_id":id,
      "action":action,
      "task_id":task_id,
      "action_qty":this.action_qty
    }
    this.apiData.actionTask(this.data)
    .subscribe(tasks => {
      if(action == 'start'){
        //Go to a new page to get DWR data
        this.router.navigate(['/runtask/',id])
      }else{
        this.resetScreen();
      }
    })
  }
  
  getTask(tp){
    this.tsk = tp;
    this.taskpds = tp.process;
  }

  //Get the open task(s)
  getTaskplans(state,id = 0){
    this.apiData.getTaskplans(state,id)
    .subscribe(ut => this.taskplans = ut);
  }

  //Get the closed task(s)
  getTskplans(id){
    this.apiData.getTaskplans(id)
    .subscribe(tp => this.tskplans = tp);
  }

  resetScreen(){
    this.getTaskplans(0);
    this.getTskplans(1);
  }

  toggleProcess(){
    if(this.show_process == 0){
      this.show_process = 1;
    }else{
      this.show_process = 0;
    }
  }

  ngOnInit() {
    this.getTaskplans(0);
    this.getTskplans(1);
  }

}
