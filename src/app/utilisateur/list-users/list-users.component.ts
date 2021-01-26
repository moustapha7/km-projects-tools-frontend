import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Departement } from 'src/app/model/departement';
import { User } from 'src/app/model/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {


  users ;
  currentUser: any;
  isLoggedIn = true;
  isconnected = false;

  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  showClientBoard = false;

  private roles: string[];

  username: string;
  loggedUser : string;
  departement : Departement = new Departement();

  user : User;
  id :number;
  constructor( public userService: UserService, private routes :Router, private token: TokenStorageService, 
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


 /*  isCurrentConnected()
  {
    this.users.forEach(element => {
      if(element.username === this.currentUser.username)
      {
        this.isconnected = true;
      }

      
    });
  } */
 
 
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


 activerCompte(id :number, user : User) 
  {
    Swal.fire({
      title: `Voulez vous activer ce  compte utilisateur  ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => 
    {
      if (result.isConfirmed)
      {
        this.userService.activeCompteUser(id,user).subscribe( data => {
          console.log(data);
          
          Swal.fire(
            'Activé!',
            'Compte bien activé.',
            'success'
          )

          this.listUsers();
        },
        (error) => {
          
          Swal.fire({
            title: `error d'activation`,
            icon: 'warning',
            showConfirmButton: false,
            timer: 1500,
          });
        
        });

      }
    })

   
  }
  
  
  desactiverCompte(id :number, user : User) 
  {
    Swal.fire({
      title: `Voulez vous desactiver ce  compte utilisateur  ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => 
    {
      if (result.isConfirmed)
      {
        this.userService.desactiveCompteUser(id,user).subscribe( data => {
          console.log(data);
          
          Swal.fire(
            'Desactivé!',
            'Compte bien desactivé.',
            'success'
          )

          this.listUsers();
        },
        (error) => {
          
          Swal.fire({
            title: `error de desactivation`,
            icon: 'warning',
            showConfirmButton: false,
            timer: 1500,
          });
        
        }
        );

      }
    })

   
  }
  
  
 
}
