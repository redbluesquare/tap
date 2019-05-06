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

  //Get the task(s)
  getTasks(id){
    this.apiData.getTasks(id)
    .subscribe(tasks => this.tasks = tasks);
  }


  ngOnInit() {
    //Get the task
    this.getTasks(+this.route.snapshot.paramMap.get('id'));
  }

}
