import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  
  public urlClient: string = 'http://localhost:8080/api';

  public baseURL = 'http://localhost:8080/api/clients';


  
  constructor(private http: HttpClient) { }

  //get le nombre de clients

	countClients()
	{
		return this.http.get(this.urlClient+"/nombreClients");
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseURL}`);
  }

  createClient(client : Client): Observable<Object> {
    return this.http.post<Client[]>(`${this.baseURL}`, client);
  }

  getClientById(id : number) : Observable<Client> {
    return this.http.get<Client>(`${this.baseURL}/${id}`);
  }

  updateClient(id:number, client : Client): Observable<Object> {
    return this.http.put<Client[]>(`${this.baseURL}/${id}`, client);
  }

  deleteClient(id : number) : Observable<Object> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
