import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Developpeur } from '../model/developpeur';
import { Powner } from '../model/powner';
import { Role } from '../model/role';
import { Techlead } from '../model/techlead';
import { User } from '../model/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  public urlUser: string = 'http://localhost:8080/api';

  
  constructor(private http: HttpClient) { }

  //get all users

	getAllUsers() :Observable<User[]>
	{
		return this.http.get<User[]>(this.urlUser+"/listUsers");
  }

  getAllDev() : Observable<Developpeur[]>
  {
    return this.http.get<Developpeur[]>(this.urlUser+ "/listDeveloppeurs");
  }

  getAllTechLead(): Observable<Techlead[]>
  {
    return this.http.get<Techlead[]>(this.urlUser+ "/listTechleads");
  }

  getAllPowner(): Observable<Powner[]>
  {
    return this.http.get<Powner[]>(this.urlUser+ "/listPowners");
  }



  
  //get all roles

	getAllRoles() :Observable<Role[]>
	{
		return this.http.get<Role[]>(this.urlUser+"/listRoles");
	}

	//get le nombre de users

	countUsers()
	{
		return this.http.get(this.urlUser+"/nombreUsers");
  }
  
  //user by id
  getUserById(id : number) : Observable<User> {
    return this.http.get<User>(`${this.urlUser}/users/${id}`);
  }


  uploadPhotoUser(file: File, idUser): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.urlUser+'/uploadPhotoUser/'+idUser, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }


  updateUser( user : User): Observable<Object> {
    return this.http.post<User[]>(`${this.urlUser}/updateUsers`, user);
  }



   activeCompteUser(id:number, user: User): Observable<Object> {
    return this.http.put(`${this.urlUser}/activeUser/${id}`,user);
  }

  desactiveCompteUser(id:number, user: User): Observable<Object> {
    return this.http.put(`${this.urlUser}/desactiveUser/${id}`, user);
  }
 

  changePassword(user : User): Observable<Object> {
    return this.http.post(`${this.urlUser}/changePassword`, user);
  }



}
