import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'app-stock-comp',
  templateUrl: './stock-comp.component.html',
  styleUrls: ['./stock-comp.component.css']
})
export class StockCompComponent implements OnInit {

  constructor(private apiData:DataApiService,
    private route: ActivatedRoute) { }

  
  chgstate:number;
  error_cat:number;
  i:number = 0;
  materials:any;
  material:string = '';
  plant:string = '';
  remark:string;
  stock_discreps:any;

  changeMaterial(digit){
    if((this.i ==0) && (digit == -1)){
      this.i = this.materials.length-1;
    }else if((this.i == this.materials.length-1) && (digit == 1)){
      this.i = 0;
    }
    else{
      this.i = this.i+digit;
    }
    this.material = this.materials[this.i].material;
    this.remark = this.materials[this.i].remark;
    this.getDiscreps();
  }

  changeState(digit){
    this.chgstate = digit;
  }

  getDiscreps(){
    this.apiData.getScDiscreps(this.material)
      .subscribe(discreps => this.stock_discreps = discreps)
  }

  getMaterials(){
    this.apiData.getScMaterials()
      .subscribe(materials => {
        this.materials = materials;
        this.material = this.materials[this.i].material;
        this.remark = this.materials[this.i].remark;
        this.getDiscreps();
      })
  }

  ngOnInit() {
    this.getMaterials();
    this.chgstate = 0;
  }

}
