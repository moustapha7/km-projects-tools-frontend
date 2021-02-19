import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/model/team';
import { User } from 'src/app/model/user';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css'],
})
export class EditTeamComponent implements OnInit {

  userTeachs: User[];
  selectedTechLead: User;

  

  addForm: FormGroup;

  id :number;
  team: Team ;


  form: any = {};
  isSuccessful = false;
  isAddProjectFailed = false;
  errorMessage = '';
  submitted = false;
 
   
  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder, private actroute : ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.id = this.actroute.snapshot.params['id'];

    this.teamService.getTeamById(this.id).subscribe(
      (data : Team)=> {
      this.team= data;
      });

   

    this.listusers();
    
    this.addForm = this.formBuilder.group({
      name: ['',   [Validators.required, Validators.minLength(2)]],
      description:['',   [Validators.required, Validators.minLength(5)]],
      user: ['',   Validators.required],
    });
  }


  listusers() {
    this.userTeachs =[];
    this.userService.getAllUsers().subscribe((data) => {
      this.userTeachs = data;
    });
  }

  get f() {
    return this.addForm.controls;
  }

  updateTeam() {

    this.userTeachs.forEach(utea => {
      if(utea.id ===  this.team.user.id)
      {
        this.selectedTechLead = utea;
       
      }
    });
  
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
       }
    this.team.user = this.selectedTechLead;
    this.teamService.updateTeam(this.id, this.addForm.value).subscribe(
      (data) => {
        Swal.fire({
          title: `team bien modifié`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['list-team']);
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }

  
}
