import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ClientService } from './services/client.service';
import { CommentaireService } from './services/commentaire.service';
import { DepartementService } from './services/departement.service';
import { ProjectService } from './services/project.service';
import { TeamService } from './services/team.service';
import { TokenStorageService } from './services/token-storage.service';
import { UserService } from './services/user.service';

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

  isAdmin = false;
  isDev = false;
  isPOwner = false ;
  isTechLead = false;


  username: string;

  currentUser: any;
  info: any;

  loggedUser : string;


  nbreUsers;
  nbreClients;
  nbreProjects;
  nbreComments;
  nbreTeams;
  nbreDepartements;


  constructor(private tokenStorageService: TokenStorageService, private token: TokenStorageService, public userService :UserService,
            private authService :AuthService, private router : Router, private teamService : TeamService, private comService : CommentaireService,
            private clientService :ClientService, private projectService : ProjectService, private depService : DepartementService) { }



  ngOnInit(): void {
    
    this.currentUser = this.token.getUser();
   // this.authService.loadToken();
  


    this.isLoggedIn = !!this.tokenStorageService.getToken();
  //  this.isConnecte = this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showUserBoard = this.roles.includes('ROLE_USER');

      this.isAdmin =this.roles.includes('ROLE_ADMIN');
      this.isDev =this.roles.includes('ROLE_DEV');
      this.isTechLead =this.roles.includes('ROLE_TEACHLEAD');
      this.isPOwner =this.roles.includes('ROLE_POWNER');


     //this.username = user.username;
      this.nombreClients();
      this.nombreProjects();
      this.nombreUsers();
      this.nombreTeams();
      this.nombreComments();
      this.nombreDepartements();
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
    this.exitpage();
   
  }

  exitpage()
  {
    this.router.navigateByUrl('/login');
  }


  nombreClients()
  {
    this.clientService.countClients().subscribe(
      data =>{
        this.nbreClients =data;
      }
    )
  }

  nombreUsers()
  {
    this.userService.countUsers().subscribe(
      data =>{
        this.nbreUsers =data;
      }
    )
  }

  nombreProjects()
  {
    this.projectService.countProject().subscribe(
      data =>{
        this.nbreProjects =data;
      }
    )
  }

  nombreTeams()
  {
    this.teamService.countTeams().subscribe(
      data =>{
        this.nbreTeams =data;
      }
    )
  }

  nombreComments()
  {
    this.comService.countComments().subscribe(
      data =>{
        this.nbreComments =data;
      }
    )
  }

  nombreDepartements()
  {
    this.depService.countDepartement().subscribe(
      data =>{
        this.nbreDepartements =data;
      }
    )
  }



}
