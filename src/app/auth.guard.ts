import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (public authService : AuthService, private routes: Router, private token : TokenStorageService){}

  canActivate() : boolean
   {

      if(this.token.getToken())
      {
        return true;
      }
      else
      {
       
        this.routes.navigate(['login']);
      
      }
  }
  
}
