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
  avg_data:Array<any> = [];
  categories:any;
  cat_id:number;
  chart:any;
  data:Array<any> = [];
  description:string;
  end_date:string;
  labels:Array<any> = [];
  location:string = '';
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

  chartData:any;
  locations:any;
  plotter:any;
  i:number;
  color:string;
  min_x:number;
  min_y:number;
  max_x:number;
  max_y:number;
  max_picks:number;
  factor_x:number;
  factor_y:number;
  factor:number;
  counter:number;
  l:number;
  x:number;
  y:number;
  xy:any;
  pick_type:number;
  mapComplete:boolean;
  location_info:any;
  modalClass:string;

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

  COTMpic(){
    if(this.modalClass=='modal'){
      this.modalClass = 'modalOpen';
    }else{
      this.modalClass = 'modal';
    }
  }

  drawAisle(locations){
    this.context.clearRect(0,0,this.myCanvas.nativeElement.width ,this.myCanvas.nativeElement.height);
    if(this.locations==undefined){
      this.locations = locations;
    }
    this.plotter = undefined;
    for(let i = 0;i < locations.length; i++){
      this.mapLocations(locations[i]);
    }
    this.factor_x = (this.myCanvas.nativeElement.width)/(this.max_x-this.min_x);
    this.factor_y = (this.myCanvas.nativeElement.height)/(this.max_y-this.min_y);
    if(this.factor_x < this.factor_y){
      this.factor = this.factor_x;
    }
    else{
      this.factor = this.factor_y;
    }
    for(let i = 0;i < locations.length; i++){
      this.drawLocation(locations[i]);
    }
  }

  drawLocation(location){
    this.x = 0;
    this.y = 0;
    
    this.mapComplete = false;
    for(let i = 0;i < this.plotter.length; i++){
      if((this.plotter[i].aisle==location.aisle) && (this.plotter[i].bay==location.bay) && (this.plotter[i].position==location.position) && (this.mapComplete != true)){
        if(location.orientation==4){
          this.x = (location.x-this.min_x+1300-this.plotter[i].nl-(location.h/this.plotter[i].l*1200))*this.factor;
        }
        if(location.orientation==2){
          this.x = (location.x-this.min_x+this.plotter[i].nl)*this.factor;
        }
        this.plotter[i].nl = this.plotter[i].nl+(location.h/this.plotter[i].l*1200);
        this.mapComplete = true;
        this.l = location.h/this.plotter[i].l*1200;
      }
    }
    this.y = this.myCanvas.nativeElement.height-((location.y+location.w)*this.factor);
    this.color = this.locationColor(location.picks/this.max_picks);
    this.context.beginPath();
    if(this.pick_type==1){
      if(location.pick_type=='1'){
        this.context.rect(this.x,this.y,(this.l*this.factor)-2,location.w*this.factor);
        this.context.fillStyle = this.color;
      }
    }
    else if(this.pick_type==2){
      if(location.pick_type=='2'){
        this.context.rect(this.x,this.y,(this.l*this.factor)-2,location.w*this.factor);
        this.context.fillStyle = this.color;

      }
    }else{
      this.context.lineWidth = 1;
      this.context.rect(this.x,this.y,(this.l*this.factor)-1,location.w*this.factor);
      this.context.fillStyle = this.color;
    }
    this.context.closePath();
    this.context.fill();
  }

  getAisles(locations=undefined){
    if(this.locations==undefined){
      this.locations = locations;
    }
    for(let i = 0;i < this.locations.length; i++){
      this.getLocationData(this.locations[i]);
    }
  }

  getLocationData(location){
    this.x = 0;
    this.y = 0;
    
    this.mapComplete = false;
    for(let i = 0;i < this.plotter.length; i++){
      if((this.plotter[i].aisle==location.aisle) && (this.plotter[i].bay==location.bay) && (this.plotter[i].position==location.position) && (this.mapComplete != true)){
        if(location.orientation==4){
          this.x = (location.x-this.min_x+1300-this.plotter[i].nl-(location.h/this.plotter[i].l*1200))*this.factor;
        }
        if(location.orientation==2){
          this.x = (location.x-this.min_x+this.plotter[i].nl)*this.factor;
        }
        this.plotter[i].nl = this.plotter[i].nl+(location.h/this.plotter[i].l*1200);
        this.mapComplete = true;
        this.l = location.h/this.plotter[i].l*1200;
      }
    }
    this.y = this.myCanvas.nativeElement.height-((location.y+location.w)*this.factor);
    if(this.xy!=undefined){
      if((this.xy[0] >= this.x) && (this.xy[0] <= this.x+(this.l*this.factor))){
        if((this.xy[1] >= this.y) && (this.xy[1] <= this.y+(location.w*this.factor))){
          this.location_info = location;
          this.modalClass = 'modalOpen';
          this.xy = undefined;
        }
      }
    }
  }

  locationColor(percent){
    let r = 0;
    let g = 0;
    let b = 0;
    let v = 0;
    if(percent < 0.5){
      v = 2*percent*255;
      g = v;
      b = 255-v;
    }else{
      v = percent*255;
      r = v;
      g =255-v;
    }
    return 'rgb('+Math.floor(r)+','+Math.floor(g)+','+Math.floor(b)+')';
  }

  mapLocations(location){
    if(location.x < this.min_x || this.min_x == undefined){
      this.min_x = location.x;
    }
    if((location.x+location.l) > this.max_x || this.max_x == undefined){
      this.max_x = location.x+location.l;
    }
    if(location.y < this.min_y || this.min_y == undefined){
      this.min_y = location.y;
    }
    if((location.y+location.w) > this.max_y || this.max_y == undefined){
      this.max_y = (location.y+location.w);
    }
    if(this.max_picks < location.picks || this.max_picks == undefined){
      this.max_picks = location.picks;
    }
    this.mapComplete = false;
    if(this.plotter==undefined){
      this.plotter = [{aisle:location.aisle,bay:location.bay,position:location.position,counter:0,l:0,nl:0}]; 
    }
    for(let i = 0;i < this.plotter.length; i++){
      if((this.plotter[i].aisle==location.aisle) && (this.plotter[i].bay==location.bay) && (this.mapComplete != true)){
        if(this.plotter[i].position==location.position){
          this.plotter[i].counter = this.plotter[i].counter+1;
          this.plotter[i].l = this.plotter[i].l+location.l;
          this.mapComplete = true;
        }
      }
    }
    if(this.mapComplete != true){
      this.plotter.push({aisle:location.aisle,bay:location.bay,position:location.position,counter:1,l:location.l,nl:0});
    }
  }

  pickType(a){
    this.pick_type = a;
    this.chartData = {
      pick_type:this.pick_type
    }
    this.i = 1;
    this.apiData.getLocations(this.chartData).subscribe(locations => this.drawAisle(locations));
  }

  ngOnInit() {
    this.getTskplans(2);
    let dt = new Date()
    this.record_year = dt.getFullYear();
    this.record_month = dt.getMonth();
    this.i = 1;
    this.pick_type=0;
    this.chartData = {
      pick_type:this.pick_type
    }
    this.apiData.getLocations(this.chartData).subscribe(locations => this.drawAisle(locations));
    this.modalClass=='modal';
  }
  
  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    this.modalClass=='modal';
  }

  @HostListener('click',['$event'])
    elemClicked(elem){
      this.xy = [elem.offsetX,elem.offsetY];
      if(elem.srcElement.nodeName == "CANVAS"){
        this.getAisles(this.locations);
      }
    } 

}
