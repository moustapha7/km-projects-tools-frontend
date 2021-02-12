import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { CodeOtp } from '../model/codeOtp';
import { Departement } from '../model/departement';






const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public baseURL = 'http://localhost:8080/api/auth/'; 

  jwt : string;
  username :string;
  roles : Array<string>;
  isLoggedIn = true;
  loggedUser : string;

  
  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(this.baseURL + 'signin', {
      username: credentials.username,
      password: credentials.password
    
      
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(this.baseURL + 'signup', {
      firstname: user.firstname,
      name: user.name,
      username: user.username,
      departement : user.departement,
      email: user.email,
      password: user.password,
      confirmPassword : user.confirmPassword
    }, httpOptions);
  }


  loggedIn()
  {
    
    this.loggedUser = localStorage.getItem('token');
    console.log(this.loggedUser);
    return this.loggedUser;
   
  }


  checkCode(codeOtp: CodeOtp): Observable<Object> {
    return this.http.post(this.baseURL+ 'verifUsers',codeOtp);
  }
 



   //list depertements

   getAllDepartement() : Observable<Departement[]>
   {
     return this.http.get<Departement[]>(this.baseURL+'listDepartement');
   }



}