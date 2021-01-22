import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  user : User;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private routes: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {

    
      this.authService.login(this.form).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
         // this.roles = this.tokenStorage.getUser().roles;
          this.routes.navigate[('dashboard')];
         this.reloadPage();
         
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );

    
    
  }

  reloadPage(): void {
    window.location.reload();
  }

}