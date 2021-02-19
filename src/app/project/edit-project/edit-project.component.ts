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
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Powner } from 'src/app/model/powner';
import { Techlead } from 'src/app/model/techlead';


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
   selectedPowner : Powner;
   selectedTechlead: Techlead;
   selectedProjectType: ProjectType;
   selectedStatusProject : StatusProject;

   submitted = false;
  


   teams:Team[];
   clients: Client[];

   powners : Powner[];
   techleads : Techlead[];

   projectTypes: ProjectType[];
   statusProjects : StatusProject[];

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
      this.listPowners();
      this.listTechLeads();
      this.listTeams();
      this.listClients();
      this.listStatusProject();
      this.listProjectType();

      this.addForm = this.formBuilder.group({
        name: ['',   [Validators.required, Validators.minLength(2)]],
        description:['',   [Validators.required, Validators.minLength(10)]],
        dateDebut: ['',   Validators.required],
        dateFin:  ['',   Validators.required],
      //  estimationJour :  ['',   Validators.required],
       // estimationHeure :  ['',   Validators.required],
        team: ['',   Validators.required],
        client:  ['',   Validators.required],
        powner :   ['',   Validators.required],
        techlead :  ['',   Validators.required],
        projectType:  ['',   Validators.required],
        statusProject :   ['',   Validators.required],
     
      });
  }

  get f() { return this.addForm.controls; }

 updateProject(): void {

   
  this.submitted = true;

  if (this.addForm.invalid) {
    return;
     }
    
  this.project.team = this.selectedTeam;
  this.project.client = this.selectedClient;
  this.project.powner = this.selectedPowner;
  this.project.techlead = this.selectedTechlead;
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

  listPowners()
	{
		this.userService.getAllPowner().subscribe(
			data => {
        this.powners= data;
      }
      
		)
  }

  listTechLeads()
	{
		this.userService.getAllTechLead().subscribe(
			data => {
        this.techleads= data;
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
