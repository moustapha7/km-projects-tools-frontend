import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusProject } from '../model/statusProject';

@Injectable({
  providedIn: 'root'
})
export class StatusProjectService {


  public url: string = 'http://localhost:8080/api';

  public baseURL = 'http://localhost:8080/api/statusProjects';


  
  constructor(private http: HttpClient) { }

  getAllStatusProject(): Observable<StatusProject[]> {
    return this.http.get<StatusProject[]>(`${this.baseURL}`);
  }

}
