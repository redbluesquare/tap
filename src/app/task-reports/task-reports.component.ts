import { Component, OnInit, HostListener } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'app-task-reports',
  templateUrl: './task-reports.component.html',
  styleUrls: ['./task-reports.component.css']
})
export class TaskReportsComponent implements OnInit {

  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;

  action_qty:number=0;
  areas:any;
  area_types:any;
  aisles:any;
  avg_data:Array<any> = [];
  bus:any;
  categories:any;
  cat_id:number;
  chart:any;
  data:Array<any> = [];
  description:string;
  end_date:string;
  labels:Array<any> = [];
  location:string = '';
  locations:any;
  material:string = '';
  material_moves:any;
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

  getAreatypes(at){
    this.area_types = at;
  }

  getArea(areas){
    this.areas = areas;
  }

  getAisle(aisles){
    this.aisles = aisles;
  }

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

  getMatMoves(){
    this.apiData.getMatMoves(this.material)
    .subscribe(mm =>this.material_moves = mm);
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
    if(view==3){
      
    }
  }

  ngOnInit() {
    this.getTskplans(2);
    let dt = new Date()
    this.record_year = dt.getFullYear();
    this.record_month = dt.getMonth();
    this.apiData.getAreas()
      .subscribe(locations => this.bus = locations);
  }
  
  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
  }

}
