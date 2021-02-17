import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusTask } from '../model/StatusTask';

@Injectable({
  providedIn: 'root'
})
export class StatusTaskService {

  public baseURL = 'http://localhost:8080/api/statusTasks';


  
  constructor(private http: HttpClient) { }

  getAllStatusTask(): Observable<StatusTask[]> {
    return this.http.get<StatusTask[]>(`${this.baseURL}`);
  }

}
