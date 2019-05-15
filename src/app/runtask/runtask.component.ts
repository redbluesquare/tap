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
  carriers:any;
  carrier:any = [];
  comment:string='';
  data:any;
  dss_id:number;
  editInvLine:number = 0;
  id:number;
  inv:any;
  invoice_date:any;
  invoice_line_price:number;
  invoice_number:string = '';
  invoices:any;
  inv_status:number = 0;
  line_reference:string;
  matDatepicker:any;
  service_code:string;
  tasks:any;

  addInvoiceline(){
    this.inv_status=3;
    //Get all data to create the invoice line
    this.data = {
      'account_number':this.account_number,
      'service_code':this.service_code,
      'invoice_number':this.invoice_number,
      'invoice_date':this.invoice_date,
      'line_reference':this.line_reference,
      'invoice_line_price':this.invoice_line_price,
      'dss_id':this.dss_id
    }
    this.apiData.addInvoice(this.data)
      .subscribe(invoices => this.invoices = invoices)
  }
  
  checkComment(){
    if(this.account_number != ''){
      this.comment = '';
    }
    else if(this.invoice_number != ''){
      this.comment = '';
    }
  }

  //Get the open task(s)
  getTaskplans(state, id = 0){
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

  startInvoice(a){
    if(a == 0){
      if(this.account_number == ''){
        this.comment = 'Please select an account';
      }
      else{
        this.inv_status=2;
        this.invoice_number = '';
        this.invoice_date = '';
      }
    }
    if(a == 1){
      if(this.invoice_number == ''){
        this.comment = 'Please Enter the invoice number';
        //Create the invoice record
        
      }
      else{
        this.addInvoiceline()
        
      }
    }
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
    this.adapter.setLocale('gb');
    //Get the task
    this.getTaskplans(0,+this.route.snapshot.paramMap.get('id'));
  }

}
