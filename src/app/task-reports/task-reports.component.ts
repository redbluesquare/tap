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
  data:Array<any> = [];
  categories:any;
  cat_id:number;
  chart:any;
  labels:Array<any> = [];
  task_id:number;
  taskplans:any;
  taskpds:any;
  title:string;
  tsk:any;
  tskplans:any[];
  description:string;
  parent_id:number;
  show_process:number=0;
  usertasks:any;
  my_date:any;

  constructor(private apiData:DataApiService) { }

  //Get the closed task(s)
  getTskplans(id){
    this.apiData.getTaskplans(id)
    .subscribe(tp => {
      this.tskplans = tp;
      for(let i=0;i < tp.length; i++){
        this.labels.push( tp[i].task_title );
        this.data.push(tp[i].process_time/60);
      }
      console.log(this.labels);
      console.log(this.data)
      this.getChart();
    });
  }

  getChart(){
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label:'Time spent',
          data: this.data,
          backgroundColor: ['red','blue','green','black'],
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


  ngOnInit() {
    this.getTskplans(1);
    
  }
  ngAfterViewInit(){
    this.getChart();
  }

}
