import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { Project } from 'src/app/model/project';
import { ProjectType } from 'src/app/model/projectType';
import { StatusProject } from 'src/app/model/statusProject';
import { Team } from 'src/app/model/team';
import { User } from 'src/app/model/user';
import { ProjectService } from 'src/app/services/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {


  projects : Project[];
  project :Project;
  clients : Client[];
  projectTypes : ProjectType[];
  statusProjects : StatusProject [];
  teams: Team[];
  productOwner : User[];
  teachLead : User[];


  constructor(private projectService : ProjectService, private routes: Router) { }

  ngOnInit(): void {
    this.listProjects();
  }

  listProjects()
  {
    this.projectService.getAllProject().subscribe(
      data => {
        this.projects = data;
      }
    )
  }

  projectDetails(id :number)
	{
    this.routes.navigate(['detail-project',id]);
  }
  
  editProject(id : number)  {
 
    this.routes.navigate(['edit-project', id]);
  }

  deleteProject(id :number) 
  {
    Swal.fire({
      title: `Voulez vous supprimer ce projet  ?`,
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
        this.projectService.deleteProject(id).subscribe( data => {
          console.log(data);
          
          Swal.fire(
            'Deleted!',
            'projet bien supprimé.',
            'success'
          )

          this.listProjects();
        });

      }
    })

   
  }
}
