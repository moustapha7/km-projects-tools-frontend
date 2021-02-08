import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Departement } from '../model/departement';




const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwt : string;
  username :string;
  roles : Array<string>;
  isLoggedIn = true;
  loggedUser : string;

  
  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    
      
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      firstname: user.firstname,
      name: user.name,
      username: user.username,
      departement : user.departement,
      email: user.email,
      password: user.password,
      confirmPassword : user.confirmPassword
    }, httpOptions);
  }


  /* saveToken(jwt: string) {

    localStorage.setItem('token',jwt);
    this.jwt = jwt;
    this.parseJWT();
  } */


  loggedIn()
  {
    
    this.loggedUser = localStorage.getItem('token');
    console.log(this.loggedUser);
    return this.loggedUser;
   
  }

 

 
/*
  
  parseJWT()
  {
    let jwtHelper =  new  JwtHelperService();
    let objJWT = jwtHelper.decodeToken(this.jwt);
    this.username = objJWT.obj;
    this.roles =  objJWT.roles;
  }
isAdmin()
  {
    return this.roles.indexOf('ADMIN')>0;
  }

  isUser()
  {
    return this.roles.indexOf('USER')>0;
  }
  
  isAuthenticated()
  {
    return this.roles &&( this.isAdmin() || this.isUser());
  }

  loadToken(){
   this.jwt = localStorage.getItem('token');
   this.parseJWT();
  }




 */


   //list depertements

   getAllDepartement() : Observable<Departement[]>
   {
     return this.http.get<Departement[]>(AUTH_API+'listDepartement');
   }



}