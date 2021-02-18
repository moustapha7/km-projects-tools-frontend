import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';
import { ClientService } from 'src/app/services/client.service';
import { ProjectTypeService } from 'src/app/services/project-type.service';
import { StatusProjectService } from 'src/app/services/status-project.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { Client } from 'src/app/model/client';
import { ProjectType } from 'src/app/model/projectType';
import { StatusProject } from 'src/app/model/statusProject';
import { Team } from 'src/app/model/team';
import { User } from 'src/app/model/user';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  id:number;
  project : Project;

 
  form: any = {};
  isSuccessful = false;
  isAddProjectFailed = false;
  errorMessage = '';
  addForm: FormGroup;

  selectedTeam:Team;
   selectedClient: Client;
   selectedUserpo : User;
   selectedUserteach : User;
   selectedProjectType: ProjectType;
   selectedStatusProject : StatusProject;

  
  teams:Team[];
   clients: Client[];
   userpos : User[];
   userteachs : User[];
   projectTypes: ProjectType[];
   statusProjects : StatusProject[];

   team:Team;
   client: Client;
   userpo : User;
   userteach : User;
   projectType: ProjectType;
   statusProject : StatusProject;

  constructor(private acroues : ActivatedRoute, private projectService :ProjectService, private clientService: ClientService, 
    private teamService : TeamService, private router: Router,  private formBuilder: FormBuilder,
    private userService :UserService,private proTypeService :ProjectTypeService, private statusProjectService : StatusProjectService) { }

  ngOnInit() {
    this.id = this.acroues.snapshot.params['id'];
    this.projectService.getProjectById(this.id).subscribe(
      (data : Project) =>
      {
        this.project= data;
      });
      this.listUsers();
      this.listTeams();
      this.listClients();
      this.listStatusProject();
      this.listProjectType();

      this.addForm = this.formBuilder.group({
        name: new FormControl('', Validators.minLength(4)),
        description: new FormControl('', Validators.minLength(4)),
        dateDebut:  new FormControl( (new Date()).toISOString().substring(0,10), Validators.required),
        dateFin:  new FormControl('', Validators.minLength(4)),
      //  estimationJour :  new FormControl('', Validators.minLength(4)),
       // estimationHeure :  new FormControl('', Validators.minLength(4)),
        team: new FormControl('', Validators.required),
        client: new FormControl('', Validators.required),
        userpo :  new FormControl('', Validators.required),
        userteach :  new FormControl('', Validators.required),
        projectType: new FormControl('', Validators.required),
        statusProject :  new FormControl('', Validators.required),
     
      });
  }

 updateProject(): void {

   
    this.project.team = this.selectedTeam;
    this.project.client = this.selectedClient;
    this.project.userpo = this.selectedUserpo;
    this.project.userteach = this.selectedUserteach;
    this.project.projectType = this.selectedProjectType;
    this.project.statusProject = this.selectedStatusProject;

    this.projectService.updateProject(this.id,this.addForm.value).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isAddProjectFailed = false;
        Swal.fire({
          title: `project bien modifié`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['list-project']);
       
      },
      err => {
        this.errorMessage = err.error.message;
        this.isAddProjectFailed = true;
      }
    );
   
  }



  
  listClients()
  {
    this.clientService.getAllClients().subscribe(
      result => {
        this.clients = result;
      }
    )
    
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
        this.userpos= data;
        this.userteachs= data;
      }
      
		)
  }
  
  listStatusProject()
  {
    this.statusProjectService.getAllStatusProject().subscribe(
      data =>{
        this.statusProjects = data;
      }
    )
  }

  listProjectType(){
    this.proTypeService.getAllProjectType().subscribe(
      data =>{
        this.projectTypes = data;
      }
    )

  }











}
