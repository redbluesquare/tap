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

  approveInvoice(){
    this.data = {
      invoice_number:this.invoice_number,
      comment:this.comment,
      account_number:this.account_number,
      credit_number:this.credit_number,
      dispute_number:this.dispute_number,
      dispute_date:this.dispute_date,
      debit_number:this.debit_number,
      credit_value:this.credit_value,
      debit_value:this.debit_value,
      inv_status:this.inv_status
    }
    this.apiData.approveInvoice(this.data)
      .subscribe(invoice => {
        if(invoice == true){
          this.messageShow = 1;
          this.messageText = 'Invoice Approved';
          this.clearInvoice()
          this.getInvoices(0)
          this.getInvoices(1)
        }
      })

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
    this.dispute_number = '';
    this.dispute_date = '';
    this.credit_number = '';
    this.debit_number = '';
    this.credit_value = 0;
    this.debit_value = 0;
    this.inv_status = 0;
  }

  dlInvoices(){
    
    this.apiData.dlInvoices()
      .subscribe(invoice => {
        if(invoice == true){
          this.messageShow = 1;
          this.messageText = 'Invoices downloaded';
        }
      })
  }

  editInvline(inv){
    this.pick_up_date = inv.pick_up_date;
    this.consignment_number =inv.consignment_number;
    this.customer_reference =inv.customer_reference;
    this.cost_center = inv.cost_center;
    this.delivery_post_code = inv.delivery_post_code;
    this.no_of_pcls = inv.no_of_pcls;
    this.total_weight = inv.total_weight;
    this.calc_rate = inv.calc_rate;
    this.total_pieces = inv.total_pieces;
    this.billed_weight = inv.billed_weight;
    this.inv_line_value = inv.inv_line_value;
    this.calc_diff = inv.calc_diff;
    this.status = inv.status;
    this.inv_comment = inv.inv_comment;
    this.apiData.getParcels(inv.dss_id)
    .subscribe(deliveries => this.deliveries = deliveries);
    this.inv_status = 2;
  }

  getApproveText(){
    this.apiData.getApproveText(this.invoice_number)
    .subscribe(invoiceText => {
        this.messageShow = 1;  
        this.messageText = invoiceText.message;
      });
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
    this.messageShow = 1;
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

  hideInvLine(){
    this.pick_up_date = '';
    this.consignment_number = '';
    this.customer_reference = '';
    this.cost_center = '';
    this.delivery_post_code = '';
    this.no_of_pcls = 0;
    this.total_weight = 0;
    this.calc_rate = 0;
    this.total_pieces = 0;
    this.billed_weight = 0;
    this.inv_line_value = 0;
    this.calc_diff = 0;
    this.status = 0;
    this.inv_comment = '';
    this.inv_status = 1;
  }

  raiseDispute(){
    this.data = {
      invoice_number:this.invoice_number,
      comment:this.comment,
      account_number:this.account_number,
      credit_number:this.credit_number,
      dispute_number:this.dispute_number,
      dispute_date:this.dispute_date,
      debit_number:this.debit_number,
      credit_value:this.credit_value,
      debit_value:this.debit_value
    }
    //raise the dispute then update the 
    //dispute info, credit and debit values
    this.apiData.raiseDispute(this.data)
      .subscribe(invoice => {
        if(invoice == true){
          this.getInvoiceDetails(this.invoice_number);
        }
      })
  }

  saveInvoice(){
    this.data = {
      invoice_number:this.invoice_number,
      comment:this.comment,
      account_number:this.account_number,
      credit_number:this.credit_number,
      dispute_number:this.dispute_number,
      dispute_date:this.dispute_date,
      debit_number:this.debit_number,
      credit_value:this.credit_value,
      debit_value:this.debit_value
    }
    this.apiData.saveInvoice(this.data)
      .subscribe(invoice => {
        if(invoice == true){
          this.messageShow = 1;
          this.messageText = 'Invoice saved'
        }
      })

  }

  saveInvLine(){
    this.data = {
      pick_up_date:this.pick_up_date,
      invoice_number:this.invoice_number,
      consignment_number:this.consignment_number,
      customer_reference:this.customer_reference,
      cost_center:this.cost_center,
      calc_rate:this.calc_rate,
      calc_diff:this.calc_diff,
      status:this.status,
      inv_comment:this.inv_comment
    }
    this.apiData.saveInvLine(this.data)
      .subscribe(result => {
        this.getInvoiceDetails(this.invoice_number);
        this.pick_up_date = '';
        this.consignment_number = '';
        this.customer_reference = '';
        this.cost_center = '';
        this.delivery_post_code = '';
        this.no_of_pcls = 0;
        this.total_weight = 0;
        this.calc_rate = 0;
        this.total_pieces = 0;
        this.billed_weight = 0;
        this.inv_line_value = 0;
        this.calc_diff = 0;
        this.status = 0;
        this.inv_comment = '';
        this.inv_status = 1;
      });
    
    
  }

  showInvoice(invoice){
    this.getInvoiceDetails(invoice.invoice_number);
    this.invoice_number = invoice.invoice_number;
    this.invoice_date = invoice.invoice_date;
    this.comment = invoice.comments;
    this.account_number = invoice.account_number;
    this.vendor_name = invoice.vendor_name;
    this.invoice_value = invoice.invoice_value;
    this.barcode = invoice.barcode;
    this.dispute_number = invoice.dispute_number;
    this.dispute_date = invoice.dispute_date;
    this.credit_number = invoice.credit_number;
    this.debit_number = invoice.debit_number;
    this.credit_value = invoice.credit_value;
    this.debit_value = invoice.debit_value;
    this.inv_status = 1;
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

  validateInvoice(){
    this.apiData.validateInvoice(this.invoice_number)
    .subscribe(invoice => {
        if(invoice == true){
          this.getInvoiceDetails(this.invoice_number);
        }
      });
  }

  ngOnInit() {
    this.adapter.setLocale('gb');
    //Get the task
    this.getTaskplans(0,+this.route.snapshot.paramMap.get('id'));
    this.getInvoices(0)
    this.getInvoices(1)
  }

}
