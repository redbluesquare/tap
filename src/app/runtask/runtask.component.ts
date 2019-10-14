import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataApiService } from '../data-api.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-runtask',
  templateUrl: './runtask.component.html',
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'},],
  styleUrls: ['./runtask.component.css']
})
export class RuntaskComponent implements OnInit {

  constructor(private apiData:DataApiService,
    private route: ActivatedRoute,
    private adapter: DateAdapter<any>) { }
  
  account_number:string = '';
  barcode:string;
  billed_weight:number;
  calc_rate:number;
  calc_diff:number;
  carriers:any;
  carrier:any = [];
  closed_invoices:any;
  consignment_number:string;
  cost_center:string;
  customer_reference:string;
  comment:string='';
  credit_number:string;
  credit_value:number;
  deliveries:any;
  delivery_post_code:string;
  data:any;
  debit_number:string;
  debit_value:number;
  dispute_number:string;
  dispute_date:string;
  dss_id:number;
  editInvLine:number = 0;
  id:number;
  inv:any;
  invoice_date:any;
  invoice_line_price:number;
  invoice_number:string = '';
  invoice_value:number;
  invoice:any;
  invoices:any;
  inv_status:number = 0;
  inv_comment:string;
  inv_line_value:number;
  line_reference:string;
  matDatepicker:any;
  messageShow = 0;
  messageText:string;
  no_of_pcls:number;
  open_invoices:any;
  pick_up_date:string;
  service_code:string = 'FLT';
  status:number;
  total_weight:number;
  total_pieces:number;
  tasks:any;
  var1:string;
  var2:string;
  var3:string;
  vendor_name:string;

  //Get the open task(s)
  getTaskplans(state, id = 0){
    this.apiData.getTaskplans(state,id)
    .subscribe(ut => {
        this.tasks = ut;
        this.id = +ut[0].task_id;
      });
  }

  startProcess(tp){
    //disable button
    this.messageShow = 1;
    this.messageText = tp.task_detail+"(STARTED)"
    this.apiData.startProcess(tp,this.var1, this.var2, this.var3)
    .subscribe(ut => {
        //update message as process complete
        this.messageText = tp.task_detail+"(COMPLETE)"
      });
  }

  ngOnInit() {
    this.adapter.setLocale('gb');
    //Get the task
    this.getTaskplans(0,+this.route.snapshot.paramMap.get('id'));
    
  }

}
