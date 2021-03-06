import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/model/team';
import { User } from 'src/app/model/user';
import { TeamService } from 'src/app/services/team.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.css']
})
export class ListTeamComponent implements OnInit {

  team : Team;
  teams : Team[];

  users : User[];

  isAdmin = false;
  isDev = false;
  isPOwner = false ;
  isTechLead = false;
  isLoggedIn = true;
  private roles: string[];

  constructor(public teamService: TeamService, private tokenStorageService: TokenStorageService,
                  private router : Router, private userService :UserService) { }

  ngOnInit(): void {
    this.listTeams();
    this.listUsers();

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    //  this.isConnecte = this.tokenStorageService.getToken();
  
      if (this.isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;

        this.isAdmin =this.roles.includes('ROLE_ADMIN');
        this.isDev =this.roles.includes('ROLE_DEV');
        this.isTechLead =this.roles.includes('ROLE_TEACHLEAD');
        this.isPOwner =this.roles.includes('ROLE_POWNER');
  

        
      } 
  }

  listTeams()
  {
    this.teamService.getAllTeams().subscribe(
      result => {
        this.teams = result;
      }
    )
    
  }

  listUsers()
  {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users =data;
      }
    )
  }

  editTeam(id : number)  {
 
    this.router.navigate(['edit-team', id]);
  }

  deleteTeam(id :number) 
  {
    Swal.fire({
      title: `Voulez vous supprimer ce team  ?`,
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
        this.teamService.deleteTeam(id).subscribe( data => {
          console.log(data);
          
          Swal.fire(
            'Deleted!',
            'team bien supprimé.',
            'success'
          )

          this.listTeams();
        });

      }
    })

   
  }
}
