import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectType } from '../model/projectType';

@Injectable({
  providedIn: 'root'
})
export class ProjectTypeService {

  public url: string = 'http://localhost:8080/api';

  public baseURL = 'http://localhost:8080/api/projectTypes';


  
  constructor(private http: HttpClient) { }


	countProjectType()
	{
		return this.http.get(this.url+"/nombreProjectTypes");
  }

  getAllProjectType(): Observable<ProjectType[]> {
    return this.http.get<ProjectType[]>(`${this.baseURL}`);
  }

  createProjectType(projectType : ProjectType): Observable<Object> {
    return this.http.post<ProjectType[]>(`${this.baseURL}`, projectType);
  }

  getProjectTypeById(id : number) : Observable<ProjectType> {
    return this.http.get<ProjectType>(`${this.baseURL}/${id}`);
  }

  updateProjectType(id:number, projectType : ProjectType): Observable<Object> {
    return this.http.put<ProjectType[]>(`${this.baseURL}/${id}`, projectType);
  }

  deleteProjectType(id : number) : Observable<Object> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
  
}