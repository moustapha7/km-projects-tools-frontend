import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departement } from '../model/departement';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  public url: string = 'http://localhost:8080/api';

  public baseURL = 'http://localhost:8080/api/departements';


  
  constructor(private http: HttpClient) { }



  getAllDepartement(): Observable<Departement[]> {
    return this.http.get<Departement[]>(`${this.baseURL}`);
  }

  createDepartement(departement : Departement): Observable<Object> {
    return this.http.post<Departement[]>(`${this.baseURL}`, departement);
  }

  getDepartementById(id : number) : Observable<Departement> {
    return this.http.get<Departement>(`${this.baseURL}/${id}`);
  }

  updateDepartement(id:number, departement : Departement): Observable<Object> {
    return this.http.put<Departement[]>(`${this.baseURL}/${id}`, departement);
  }

  deleteDepartement(id : number) : Observable<Object> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
  
}