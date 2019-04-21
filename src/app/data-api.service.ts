import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { strictEqual } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private http:HttpClient) { }

  private categoriesUrl = 'http://localhost:5001/categories/';  // URL to categories api
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
  
  getCategories(id = 0): Observable<any[]> {
    if(id!=0){
      this.categoriesUrl+id.toString()
    }
    return this.http.get<any[]>(this.categoriesUrl)
  }

  getTaskplans(status = 0): Observable<any[]> {
    return this.http.get<any[]>(this.taskplansUrl+status.toString())
  }

  getTaskProcesses(status = 0): Observable<any[]> {
    return this.http.get<any[]>(this.taskplansUrl+status.toString())
  }

  getTasks(id = 0): Observable<any[]> {
    if(id!=0){
      this.tasksUrl+id.toString()
    }
    return this.http.get<any[]>(this.tasksUrl)
  }

  getUsertasks(id = 0): Observable<any[]> {
    if(id!=0){
      this.tasksUrl+id.toString()
    }
    return this.http.get<any[]>(this.tasksUrl)
  }

  updateTask(data): Observable<any> {
    return this.http.post<any>(this.tasksUrl, data)
  }

  updateTP(data): Observable<any> {
    return this.http.post<any>(this.taskplansUrl, data)
  }
}
