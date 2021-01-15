import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../model/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
 
  public urlTeam: string = 'http://localhost:8080/api';

  public baseURL = 'http://localhost:8080/api/teams';


  
  constructor(private http: HttpClient) { }

  //get le nombre de Team

	countTeams()
	{
		return this.http.get(this.urlTeam+"/nombreTeams");
  }

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseURL}`);
  }

  createTeam(team : Team): Observable<Object> {
    return this.http.post<Team[]>(`${this.baseURL}`, team);
  }

  getTeamById(id : number) : Observable<Team> {
    return this.http.get<Team>(`${this.baseURL}/${id}`);
  }

  updateTeam(id:number, team : Team): Observable<Object> {
    return this.http.put<Team[]>(`${this.baseURL}/${id}`, team);
  }

  deleteTeam(id : number) : Observable<Object> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
