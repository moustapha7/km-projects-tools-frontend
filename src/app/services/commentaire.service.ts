import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentaire } from '../model/commentaire';

@Injectable({
  providedIn: 'root',
})
export class CommentaireService {
  public baseURL = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient) {}

  //get le nombre de comments

  countComments() {
    return this.http.get(this.baseURL + '/nombre');
  }

  getAllComments(): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.baseURL}`);
  }

  createComment(commentaire: Commentaire): Observable<Object> {
    return this.http.post<Commentaire[]>(`${this.baseURL}`, commentaire);
  }

  deleteComment(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}