import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departement } from '../model/departement';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {


  public baseURL = 'http://localhost:8080/api';


  
  constructor(private http: HttpClient) { }



  getAllDepartement(): Observable<Departement[]> {
    return this.http.get<Departement[]>(`${this.baseURL}/departements`);
  }

  createDepartement(departement : Departement): Observable<Object> {
    return this.http.post<Departement[]>(`${this.baseURL}/departements`, departement);
  }

  getDepartementById(id : number) : Observable<Departement> {
    return this.http.get<Departement>(`${this.baseURL}/departements/${id}`);
  }

  updateDepartement(id:number, departement : Departement): Observable<Object> {
    return this.http.put<Departement[]>(`${this.baseURL}/departements/${id}`, departement);
  }

  deleteDepartement(id : number) : Observable<Object> {
    return this.http.delete(`${this.baseURL}/departements/${id}`);
  }

  countDepartement()
  {
    return this.http.get(`${this.baseURL}/nombreDepartements`);
  }
  
}