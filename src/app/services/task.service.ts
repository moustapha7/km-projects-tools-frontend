import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  public baseURL: string = 'http://localhost:8080/api';


  constructor(private http: HttpClient) { }

  countTask()
	{
		return this.http.get(this.baseURL+"/nombreTasks");
  }

  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseURL}/tasks`);
  }

  createTask(task: Task): Observable<Object> {
    return this.http.post<Task[]>(`${this.baseURL}/tasks`, task);
  }

  getTaskById(id : number) : Observable<Task> {
    return this.http.get<Task>(`${this.baseURL}/tasks/${id}`);
  }

  updateTask(id:number, task : Task): Observable<Object> {
    return this.http.put<Task[]>(`${this.baseURL}/tasks/${id}`, task);
  }

  deleteTask(id : number) : Observable<Object> {
    return this.http.delete(`${this.baseURL}/tasks/${id}`);
  }




}
