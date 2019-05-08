import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataApiService } from '../data-api.service';
import { PARAMETERS } from '@angular/core/src/util/decorators';


@Component({
  selector: 'app-runtask',
  templateUrl: './runtask.component.html',
  styleUrls: ['./runtask.component.css']
})
export class RuntaskComponent implements OnInit {

  id:number;
  tasks:any;

  constructor(private apiData:DataApiService,
    private route: ActivatedRoute) { }

  //Get the open task(s)
  getTaskplans(state,id = 0){
    this.apiData.getTaskplans(state,id)
    .subscribe(ut => this.tasks = ut);
  }


  ngOnInit() {
    //Get the task
    this.getTaskplans(0,+this.route.snapshot.paramMap.get('id'));
  }

}
