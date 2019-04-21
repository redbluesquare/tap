import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'app-task-reports',
  templateUrl: './task-reports.component.html',
  styleUrls: ['./task-reports.component.css']
})
export class TaskReportsComponent implements OnInit {

  action_qty:number=0;
  avg_data:Array<any> = [];
  categories:any;
  cat_id:number;
  chart:any;
  data:Array<any> = [];
  description:string;
  end_date:string;
  labels:Array<any> = [];
  material:string;
  max_data:Array<any> = [];
  my_date:any;
  min_data:Array<any> = [];
  parent_id:number;
  record_month:any;
  record_year:any;
  searchText:string;
  show_process:number=0;
  start_date:string;
  task_id:number;
  taskplans:any;
  taskpds:any;
  title:string;
  tsk:any;
  tskplans:any[];
  usertasks:any;
  viewState:number = 0;

  constructor(private apiData:DataApiService) { }

  //Get the closed task(s)
  getTskplans(id){
    this.apiData.getTaskplans(id)
    .subscribe(tp => {
      this.tskplans = tp;
      this.labels = [];
      this.data = []
      for(let i=0;i < tp.length; i++){
        this.labels.push( tp[i].task_title );
        this.data.push(tp[i].process_time/60)
        this.avg_data.push(tp[i].avg_process_time/60);
        this.max_data.push(tp[i].max_process_time/60);
        this.min_data.push(tp[i].min_process_time/60);
      }
      if(this.viewState == 1){
        this.getChart();
      }
    });
  }

  getChartSummary(){
    this.viewState = 1;
    this.getTskplans(2);
  }

  getChart(){
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label:'Total Time',
          data: this.data,
          backgroundColor:'red',
          borderWidth: 1
        },
        {
          label:'Avg Time',
          data: this.avg_data,
          backgroundColor:'blue',
          borderWidth: 1
        },
        {
          label:'Max Time',
          data: this.max_data,
          backgroundColor:'green',
          borderWidth: 1
        },
        {
          label:'Min Time',
          data: this.min_data,
          backgroundColor:'grey',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
              ticks: {beginAtZero: true}
          }]
        }
      }
    });
  }

  removeItem(type, title){
    if(type == 'task'){
      let index = this.labels.indexOf(title);
      this.labels.splice(index,1);
      this.data.splice(index,1);
      this.avg_data.splice(index,1);
      this.min_data.splice(index,1);
      this.max_data.splice(index,1);
    }
    this.getChart();
  }

  updateMatMoves(){
    this.material = this.material.replace(/\.| /g,"");
    console.log(this.material)
  }

  updateView(view){
    this.viewState = view;
  }

  ngOnInit() {
    this.getTskplans(2);
    let dt = new Date()
    this.record_year = dt.getFullYear();
    this.record_month = dt.getMonth();
    
  }
  ngAfterViewInit(){
    
  }

}
