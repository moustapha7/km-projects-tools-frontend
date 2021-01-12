import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { Project } from 'src/app/model/project';
import { ProjectType } from 'src/app/model/projectType';
import { StatusProject } from 'src/app/model/statusProject';
import { Team } from 'src/app/model/team';
import { User } from 'src/app/model/user';
import { ClientService } from 'src/app/services/client.service';
import { ProjectTypeService } from 'src/app/services/project-type.service';
import { ProjectService } from 'src/app/services/project.service';
import { StatusProjectService } from 'src/app/services/status-project.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {


  form: any = {};
  isSuccessful = false;
  isAddProjectFailed = false;
  errorMessage = '';

  project : Project;
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


  constructor(private projectService :ProjectService, private clientService: ClientService, private teamService : TeamService, private router: Router,
      private userService :UserService,private proTypeService :ProjectTypeService, private statusProjectService : StatusProjectService
    ) { }

  ngOnInit(): void {
    this.listUsers();
    this.listTeams();
    this.listClients();
    this.listStatusProject();
    this.listProjectType();
  }

  saveProject(): void {

    this.project = new Project(
      this.form.name,
      this.form.description,
  		this.form.dateDebut,
      this.form.dateFin,
      this.form.estimationJour,
      this.form.estimationHeure,
      this.form.team,
      this.form.client,
      this.form.userpo,
      this.form.userteach,
      this.form.projectType,
      this.form.statusProject
      );
      
    this.project.team = this.selectedTeam;
    this.project.client = this.selectedClient;
    this.project.userpo = this.selectedUserpo;
    this.project.userteach = this.selectedUserteach;
    this.project.projectType = this.selectedProjectType;
    this.project.statusProject = this.selectedStatusProject;

    this.projectService.createProject(this.project).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isAddProjectFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isAddProjectFailed = true;
      }
    );
    this.router.navigate[("list-project")];
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
