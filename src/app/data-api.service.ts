import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { strictEqual } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private http:HttpClient) { }

  url = ''
  data:string;

  private areasUrl = 'http://localhost:5001/areas/';  // URL to categories api
  private categoriesUrl = 'http://localhost:5001/categories/';  // URL to categories api
  private deliveriesUrl = 'http://localhost:5001/deliveries/';
  private locationsUrl = 'http://localhost:5001/locations/';  // URL to web api
  private invoicesUrl = 'http://localhost:5001/invoices/';  // URL to web api
  private invoiceDetailsUrl = 'http://localhost:5001/invoicedetails/';
  private materialUrl = 'http://localhost:5001/materials/';
  private taskactionsUrl = 'http://localhost:5001/taskactions/';  // URL to task actions api
  private taskplansUrl = 'http://localhost:5001/taskplans/';  // URL to task planner api
  private taskprocessUrl = 'http://localhost:5001/taskprocesses/' //URL to task process details api
  private tasksUrl = 'http://localhost:5001/tasks/';  // URL to tasks api
  private usertasksUrl = 'http://localhost:5001/usertasks/';  // URL to user tasks api

  actionTask(data): Observable<any> {
    return this.http.post<any>(this.taskactionsUrl, data)
  }
  
  addCategory(data): Observable<any> {
    return this.http.post<any>(this.categoriesUrl, data)
  }

  addInvoice(data): Observable<any> {
    return this.http.post<any>(this.invoicesUrl, data)
  }

  addTask(data): Observable<any> {
    return this.http.post<any>(this.tasksUrl, data)
  }

  addTaskProcessStep(data): Observable<any> {
    return this.http.post<any>(this.taskprocessUrl, data)
  }

  addTaskplan(data): Observable<any> {
    return this.http.post<any>(this.taskplansUrl, data)
  }

  deleteCategory(id): Observable<any> {
    return this.http.delete<any>(this.categoriesUrl+id.toString())
  }
  deleteTask(id): Observable<any> {
    return this.http.delete<any>(this.tasksUrl+id.toString())
  }
  deleteTaskPD(id): Observable<any> {
    return this.http.delete<any>(this.taskprocessUrl+id.toString())
  }

  deleteTaskPlan(id): Observable<any> {
    return this.http.delete<any>(this.taskplansUrl+id.toString())
  }

  getAreas(): Observable<any> {

    return this.http.get<any>(this.areasUrl);
  }
  
  getCategories(id = 0): Observable<any[]> {
    if(id!=0){
      this.categoriesUrl = this.categoriesUrl+id.toString()
    }
    return this.http.get<any[]>(this.categoriesUrl)
  }

  getInvoices(state, invoice = ''): Observable<any[]> {
    if(invoice!=''){
      this.categoriesUrl = this.invoicesUrl+state.toString()+'/'+invoice
    }
    return this.http.get<any[]>(this.invoicesUrl+state.toString())
  }

  getInvoiceDetails(invoice_number): Observable<any[]> {
    return this.http.get<any[]>(this.invoiceDetailsUrl+invoice_number)
  }

  getLocations(data): Observable<any> {
    if(data != undefined){
      data = 'pick_type/'+data.pick_type;
    }
    return this.http.get<any>(this.locationsUrl+data);
  }

  getMatMoves(mat=''): Observable<any[]> {

    return this.http.get<any[]>(this.materialUrl+mat)
  }

  getParcels(dss_id): Observable<any[]> {
    return this.http.get<any[]>(this.deliveriesUrl+dss_id);
  }

  getTaskplans(status = 0, id = 0, year = 0, month = 0): Observable<any[]> {
    return this.http.get<any[]>(this.taskplansUrl+status.toString()+'/'+id.toString()+'/'+year.toString()+'/'+month.toString())
  }

  getTaskProcesses(status = 0): Observable<any[]> {
    return this.http.get<any[]>(this.taskplansUrl+status.toString())
  }

  getTasks(id = 0): Observable<any[]> {
    if(id > 0){
      this.url = id.toString()
    }
    else{
      this.url = ''
    }
    return this.http.get<any[]>(this.tasksUrl+this.url)
  }

  getUsertasks(id = 0): Observable<any[]> {
    if(id > 0){
      this.url = id.toString()
    }
    else{
      this.url = ''
    }
    return this.http.get<any[]>(this.tasksUrl+this.url)
  }

  saveInvLine(data): Observable<any> {

    return this.http.post<any>(this.invoiceDetailsUrl+this.url, data)
  }

  startProcess(tp, v1, v2, v3): Observable<any> {
    if(v1!=undefined){
      v1 = '/'+v1
    }else{
      v1 = ''
    }
    if(v2!=undefined){
      v2 = '/'+v2
    }else{
      v2 = ''
    }
    if(v3!=undefined){
      v3 = '/'+v3
    }else{
      v3 = ''
    }
    return this.http.get<any>(tp.process_link+v1+v2+v3)
  }

  updateTask(data): Observable<any> {
    return this.http.post<any>(this.tasksUrl, data)
  }

  updateTP(data): Observable<any> {
    return this.http.post<any>(this.taskplansUrl, data)
  }
}
