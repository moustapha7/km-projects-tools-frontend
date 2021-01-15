import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public url: string = 'http://localhost:8080/api';

  public baseURL = 'http://localhost:8080/api/projects';


  
  constructor(private http: HttpClient) { }


	countProject()
	{
		return this.http.get(this.url+"/nombreProjects");
  }

  getAllProject(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseURL}`);
  }

  createProject(project: Project): Observable<Object> {
    return this.http.post<Project[]>(`${this.baseURL}`, project);
  }

  getProjectById(id : number) : Observable<Project> {
    return this.http.get<Project>(`${this.baseURL}/${id}`);
  }

  updateProject(id:number, project : Project): Observable<Object> {
    return this.http.put<Project[]>(`${this.baseURL}/${id}`, project);
  }

  deleteProject(id : number) : Observable<Object> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }


}