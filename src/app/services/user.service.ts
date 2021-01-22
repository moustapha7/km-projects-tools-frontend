import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';



const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public urlUser: string = 'http://localhost:8080/api';

  private userUrl = 'http://localhost:8080/api/test/user';
  private pmUrl = 'http://localhost:8080/api/test/pm';
  private adminUrl = 'http://localhost:8080/api/test/admin';

  public urlUserActif: string = 'http://localhost:8080/api/activeUser';

  public urlUserDesActif: string = 'http://localhost:8080/api/desactiveUser';

  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, { responseType: 'text' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }
  


  //get all users

	getAllUsers() :Observable<User[]>
	{
		return this.http.get<User[]>(this.urlUser+"/listUsers");
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


   activeCompteUser(id:number, user: User): Observable<Object> {
    return this.http.put(`${this.urlUserActif}/${id}`,user);
  }

  desactiveCompteUser(id:number, user: User): Observable<Object> {
    return this.http.put(`${this.urlUserDesActif}/${id}`, user);
  }
 




}
