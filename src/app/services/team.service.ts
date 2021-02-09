import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../model/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
 
  public urlTeam: string = 'http://localhost:8080/api';




  
  constructor(private http: HttpClient) { }

  //get le nombre de Team

	countTeams()
	{
		return this.http.get(this.urlTeam+"/nombreTeams");
  }

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.urlTeam}/teams`);
  }

  createTeam(team : Team): Observable<Object> {
    return this.http.post<Team[]>(`${this.urlTeam}/teams`, team);
  }

  getTeamById(id : number) : Observable<Team> {
    return this.http.get<Team>(`${this.urlTeam}/teams/${id}`);
  }

  updateTeam(id:number, team : Team): Observable<Object> {
    return this.http.put<Team[]>(`${this.urlTeam}/teams/${id}`, team);
  }

  deleteTeam(id : number) : Observable<Object> {
    return this.http.delete(`${this.urlTeam}/teams/${id}`);
  }

}
