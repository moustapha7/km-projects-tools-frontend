import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/model/team';
import { User } from 'src/app/model/user';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {


  temas;
  userTeachs : User[];
  selectedTechLead : User;

  team : Team = new Team();
  constructor(private teamService :TeamService, private userService : UserService) { }

  ngOnInit(): void {
    this.listusers();
  }

  saveTeam()
  {
    this.team.user = this.selectedTechLead;
    this.teamService.createTeam(this.team).subscribe(
      data => {
        
      }
    )
  }

  listusers()
  {
    this.userService.getAllUsers().subscribe(
      data =>{
        this.userTeachs =data;
      }
    )
  }

}
