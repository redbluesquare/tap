import { Component, OnInit, HostListener } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { DataApiService } from '../data-api.service';
import { isNumber } from 'util';

@Component({
  selector: 'app-task-reports',
  templateUrl: './task-reports.component.html',
  styleUrls: ['./task-reports.component.css']
})
export class TaskReportsComponent implements OnInit {

  @ViewChild('myCanvas', {static:true}) myCanvas: ElementRef;
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
  current_date:Date;
  current_month:number = 0;
  current_month_name:string;
  current_year:number = 0;
  data:Array<any> = [];
  description:string;
  end_date:string;
  from_date:string;
  labels:Array<any> = [];
  location:string = '';
  locations:any;
  material:string = '';
  material_moves:any;
  max_data:Array<any> = [];
  monthNames:any = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
  my_date:any;
  min_data:Array<any> = [];
  parent_id:number;
  searchText:string;
  show_process:number=0;
  start_date:string;
  task_id:number;
  taskplans:any;
  taskpds:any;
  title:string;
  to_date:string;
  tsk:any;
  tskplans:any[];
  usertasks:any;
  viewState:number = 0;


  constructor(private apiData:DataApiService) { }

  getAreatypes(at){
    this.area_types = at;
    this.areas = undefined;
    this.aisles = undefined;
  }

  getArea(areas){
    this.areas = areas;
    this.aisles = undefined;
  }

  getAisle(aisles){
    this.aisles = aisles;
  }

  //Get the closed task(s)
  getTskplans(state, id, year = 0, month = 0){
    this.apiData.getTaskplans(state, id, year, month)
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
    this.getTskplans(2,0);
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

  updateDate(a=undefined){
    
    if(a==0){
      this.current_date = new Date();
      this.current_year = this.current_date.getFullYear()
      this.current_month = this.current_date.getMonth()
    }
    if(a==1){
      if(this.current_month>11){
        this.current_month = 1;
        this.current_year = this.current_year+a;
      }
      else{
        this.current_month = this.current_month+a;
      }
    }
    if(a==-1){
      if(this.current_month<2){
        this.current_month = 12;
        this.current_year = this.current_year+a;
      }
      else{
        this.current_month = this.current_month+a;
      }
    }
    this.current_month_name=this.monthNames[this.current_month];
    this.from_date = this.current_year+'-'+(this.current_month)+'-01';
    let lastDate = new Date(this.current_year,this.current_month,0).getDate();
    this.to_date = this.current_year+'-'+(this.current_month)+'-'+lastDate;
    this.getTskplans(2, 0, this.current_year, this.current_month+1);
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
    this.getTskplans(2, 0);
    this.updateDate(0)
    this.apiData.getAreas()
      .subscribe(locations => this.bus = locations);
  }
  
  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
  }

}
