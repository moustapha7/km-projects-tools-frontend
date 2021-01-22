import { HttpEventType, HttpResponse } from '@angular/common/http';
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


  editPhoto: boolean;
  currentProject;
  selectedFiles;
  progress: number;
  currentFileUpload: any;
  title:string;
  currentTime: number;

  
  selectedTeam :Team;


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

    this.project.team = this.teams.filter(
      c=> c.id === this.project.team.id
    )[0];
    
   /*  this.teams.forEach(tea => {
      if(tea.id === this.project.team.id)
      {
        this.selectedTeam = tea;
      }
    })
 */
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





   //upload photo

   onEditPhoto(p)
   {
     this.currentProject = p;
     this.editPhoto = true;
   }
 
   onSelectedFile(event)
   {
     this.selectedFiles = event.target.files;
   }
 
   getTS() {
     return this.currentTime;
   }
   
   uploadPhoto() {
     this.progress = 0;
     this.currentFileUpload = this.selectedFiles.item(0)
     this.projectService.uploadPhotoProject(this.currentFileUpload, this.currentProject.id).subscribe(event => {
       if (event.type === HttpEventType.UploadProgress) {
         this.progress = Math.round(100 * event.loaded / event.total);
       } else if (event instanceof HttpResponse) {
         //console.log(this.router.url);
         //this.getProducts(this.currentRequest);
         //this.refreshUpdatedProduct();
         this.currentTime=Date.now();
         this.editPhoto=false;
       }
     },err=>{
       alert("Problème de chargement");
     })
 
     //this.getProducts('/products/search/selectedProducts');
  
 
     this.selectedFiles = undefined
   }
 
 
}
