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
  carriers:any;
  carrier:any = [];
  closed_invoices:any;
  comment:string='';
  credit_number:string;
  credit_value:number;
  data:any;
  debit_number:string;
  debit_value:number;
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
  line_reference:string;
  matDatepicker:any;
  messageShow = 0;
  messageText:string;
  open_invoices:any;
  service_code:string = 'FLT';
  tasks:any;
  var1:string;
  var2:string;
  var3:string;
  vendor_name:string;

  addInvoiceline(){
    this.inv_status=3;
    //Get all data to create the invoice line
    this.data = {
      'account_number':this.account_number,
      'service_code':this.service_code,
      'invoice_number':this.invoice_number,
      'invoice_date':this.invoice_date,
      'line_reference':this.line_reference,
      'invoice_line_price':this.invoice_line_price
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

  clearInvoice(){
    this.invoice_number = '';
    this.invoice_date = '';
    this.comment = '';
    this.account_number = '';
    this.vendor_name = '';
    this.invoice_value = 0;
    this.barcode = '';
    this.credit_number = '';
    this.debit_number = '';
    this.credit_value = 0;
    this.debit_value = 0;
    this.inv_status = 0;
  }

  //Get the open task(s)
  getInvoices(state, invoice = ''){
    this.apiData.getInvoices(state, invoice)
    .subscribe(invoices => {
        if(state == 0){
          this.open_invoices = invoices;
        }
        if(state == 1){
          this.closed_invoices = invoices;
        }
      });
  }
  //Get the open task(s)
  getInvoiceDetails(invoice_number){
    this.apiData.getInvoiceDetails(invoice_number)
    .subscribe(invoice => this.invoice = invoice);
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

  showInvoice(invoice){
    this.invoice_number = invoice.invoice_number;
    this.invoice_date = invoice.invoice_date;
    this.comment = invoice.comments;
    this.account_number = invoice.account_number;
    this.vendor_name = invoice.vendor_name;
    this.invoice_value = invoice.invoice_value;
    this.barcode = invoice.barcode;
    this.credit_number = invoice.credit_number;
    this.debit_number = invoice.debit_number;
    this.credit_value = invoice.credit_value;
    this.debit_value = invoice.debit_value;
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

  startProcess(tp){
    //disable button
    this.messageShow = 1;
    this.messageText = tp.task_detail+"(STARTED)"
    this.apiData.startProcess(tp,this.var1, this.var2, this.var3)
    .subscribe(ut => {
        //update message as process complete
        console.log(ut);
        this.messageText = tp.task_detail+"(COMPLETE)"
      });
  }

  resetCarriers(){
    this.inv_status = 0;
  }

  ngOnInit() {
    this.comment = "123"
    this.adapter.setLocale('gb');
    //Get the task
    this.getTaskplans(0,+this.route.snapshot.paramMap.get('id'));
    this.getInvoices(0)
    this.getInvoices(1)
  }

}
