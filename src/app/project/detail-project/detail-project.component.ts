import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Commentaire } from 'src/app/model/commentaire';
import { Project } from 'src/app/model/project';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { ProjectService } from 'src/app/services/project.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.css']
})
export class DetailProjectComponent implements OnInit {

  id:number;
  project :Project;

  editPhoto: boolean;
  currentProject;
  selectedFiles;
  progress: number;
  currentFileUpload: any;
  title:string;
  currentTime: number;
  selectedProject : Project;

  isAdmin = false;
  isDev = false;
  isPOwner = false ;
  isTechLead = false;
  isLoggedIn = true;
  private roles: string[];
 
  constructor(private acroute: ActivatedRoute, public projectService : ProjectService, private routes : Router, 
    private formBuilder : FormBuilder, private comService : CommentaireService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.id= this.acroute.snapshot.params['id'];

  //  this.project = new Project();
    this.projectService.getProjectById(this.id).subscribe(data => {
      this.project = data;
    });



  
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

          this.routes.navigate(['list-project']);
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
