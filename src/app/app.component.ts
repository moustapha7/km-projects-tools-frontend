import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'km projects tools';




  private roles: string[];
  isLoggedIn = true;
  isConnecte;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  username: string;

  currentUser: any;
  info: any;

  loggedUser : string;

  constructor(private tokenStorageService: TokenStorageService, private token: TokenStorageService, 
    private authService :AuthService, private router : Router) { }



  ngOnInit(): void {
    
    this.currentUser = this.token.getUser();
    this.authService.loadToken();
  


    this.isLoggedIn = !!this.tokenStorageService.getToken();
  //  this.isConnecte = this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showUserBoard = this.roles.includes('ROLE_USER');


      this.username = user.username;
      
    }

    
   
  }

  loggedIn()
  {
    
    this.loggedUser = localStorage.getItem('token');
    console.log(this.loggedUser);
    return this.loggedUser;
   
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
    this.router.navigate[('login')];
  }
}
