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
  userTeachs : User[];
  selectedTechLead : User;

  form: any = {};
  isSuccessful = false;
  isAddProjectFailed = false;
  errorMessage = '';


  addForm : FormGroup;

  team : Team = new Team();
  constructor(private teamService :TeamService, private userService : UserService, private router : Router, 
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.listusers();
    this.addForm = this.formBuilder.group({
  
      name: new FormControl('',  Validators.minLength(4)),
      description: new FormControl('',  Validators.minLength(4)),
      user: new FormControl('',  Validators.minLength(4)),
     
    });

  }



  saveTeam()
  {
    this.team.user = this.selectedTechLead;
    this.teamService.createTeam(this.addForm.value).subscribe(
      data => {

        
          Swal.fire({
            title: `team bien ajouté`,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
            
          });
          this.router.navigate(['list-team']);

        },
         error => {
            console.log('error to save team'); 
            this.errorMessage = error.error.message;

         }
        
      );
   
        
      
    
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
