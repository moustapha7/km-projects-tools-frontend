import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Departement } from 'src/app/model/departement';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {


  users;
  currentUser: any;
  isLoggedIn = true;

  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  showClientBoard = false;

  private roles: string[];

  username: string;
  loggedUser : string;
  departement : Departement = new Departement();

  constructor( private userService: UserService, private routes :Router, private token: TokenStorageService, 
    private tokenStorageService: TokenStorageService) { }


  ngOnInit(): void {

    this.currentUser = this.token.getUser();
    this.listUsers();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showUserBoard = this.roles.includes('ROLE_USER');
      this.showClientBoard = this.roles.includes('ROLE_CLIENT');


      this.username = user.username;
      
    }
  }

  listUsers()
	{
		this.userService.getAllUsers().subscribe(
			data => {
				this.users= data;
			}
		)
  }
  
  userDetails(id :number)
	{
    this.routes.navigate(['details-user',id]);
	}

}
