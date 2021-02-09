import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentaire } from '../model/commentaire';

@Injectable({
  providedIn: 'root',
})
export class CommentaireService {
  public baseURL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  //get le nombre de comments

  countComments() {
    return this.http.get(this.baseURL + '/nombreComments');
  }

  getAllComments(): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.baseURL}/comments`);
  }

  createComment(commentaire: Commentaire): Observable<Object> {
    return this.http.post<Commentaire[]>(`${this.baseURL}/comments`, commentaire);
  }

  deleteComment(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/comments/${id}`);
  }
}