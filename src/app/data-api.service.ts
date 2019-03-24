import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { strictEqual } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private http:HttpClient) { }

  private categoriesUrl = 'http://127.0.0.1:5001/categories/';  // URL to web api
  private tasksUrl = 'http://127.0.0.1:5001/tasks/';  // URL to web api
  private usertasksUrl = 'http://127.0.0.1:5001/usertasks/';  // URL to web api

  addCategory(data): Observable<any> {
    return this.http.post<any>(this.categoriesUrl, data)
  }

  addTask(data): Observable<any> {
    return this.http.post<any>(this.tasksUrl, data)
  }
  
  getCategories(id = 0): Observable<any[]> {
    if(id!=0){
      this.categoriesUrl+id.toString()
    }
    return this.http.get<any[]>(this.categoriesUrl)
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

}
