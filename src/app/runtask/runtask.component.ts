import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataApiService } from '../data-api.service';


@Component({
  selector: 'app-runtask',
  templateUrl: './runtask.component.html',
  styleUrls: ['./runtask.component.css']
})
export class RuntaskComponent implements OnInit {

  carriers:any;
  carrier:any = [];
  id:number;
  inv:any;
  invoices:any;
  inv_status:number = 0;
  tasks:any;

  constructor(private apiData:DataApiService,
    private route: ActivatedRoute) { }

  //Get the open task(s)
  getTaskplans(state,id = 0){
    this.apiData.getTaskplans(state,id)
    .subscribe(ut => {
        this.tasks = ut;
        this.id = +ut[0].task_id;
      });
  }


  selectCarrier(carrier){
    this.carrier = carrier;
    this.inv_status = 1;
  }

  resetCarriers(){
    this.inv_status = 0;
  }

  ngOnInit() {
    this.carriers = [
      {title:'DND',accounts:[{account:'DND_RB'}]},
      {title:'Davison',accounts:[{account:'DND_RB'}]},
      {title:'Euro SDB',accounts:[{account:'ROBERTBO'}]},
      {title:'TNT',accounts:[{account:'0600172191'},{account:'0600172183'}]}
  ]
    //Get the task
    this.getTaskplans(0,+this.route.snapshot.paramMap.get('id'));
  }

}
