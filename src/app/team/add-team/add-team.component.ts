import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Team } from 'src/app/model/team';
import { User } from 'src/app/model/user';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {


  temas;
  usertechs : User[];
  selectedTechLead : User;

  form: any = {};
  isSuccessful = false;
  isAddFailed = false;
  errorMessage = '';


  addForm : FormGroup;
  team : Team;


  constructor(private teamService :TeamService, private userService : UserService, private router : Router, 
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.listusers();

  }


  saveTeam() :void
  {
      this.team = new Team(
        this.form.name,
        this.form.description,
        this.form.usertech
      );

    this.team.usertech = this.selectedTechLead;
    this.teamService.createTeam(this.team).subscribe(
      data => {

        this.isSuccessful = true;
        this.isAddFailed = false;
          this.router.navigate(['list-team']);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isAddFailed = true;
          this.router.navigate(['add-team']);
        }
         
      );
    

        
      
    
  }

  listusers()
  {
    this.userService.getAllUsers().subscribe(
      data =>{
        this.usertechs =data;
      }
    )
  }

}
