import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Commentaire } from 'src/app/model/commentaire';
import { Project } from 'src/app/model/project';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { ProjectService } from 'src/app/services/project.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  id:number;
  project :Project;
  commentForm : FormGroup;
  form: any = {};
  commentaire : Commentaire = new Commentaire();
  comments;
  currentUser: any;
  username : any;
  nbreComments;
  selectedProject : Project;
  projects : Project[];

  constructor(private acroute: ActivatedRoute, public projectService : ProjectService, private routes : Router, private token: TokenStorageService,
    private formBuilder : FormBuilder, private comService : CommentaireService,  private userService : UserService) { }


  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if(this.currentUser.username === this.commentaire.username)
    {
      this.username = this.currentUser.username;
    }

    this.id= this.acroute.snapshot.params['id'];

  //  this.project = new Project();
    this.projectService.getProjectById(this.id).subscribe(data => {
      this.project = data;
    });

    this. listProjects();
    this.listComments();
    this.commentForm = this.formBuilder.group({
      project : new FormControl(''),
      content: new FormControl('', Validators.minLength(2)),
    })
    
  }


  
  SaveComment()
  {
    this.commentaire.project = this.selectedProject;
    this.comService.createComment(this.commentForm.value).subscribe(
      data =>
      {
        console.log(data);
      }
    );
    this.routes.navigate(['detail-project']);
  }

  listComments()
  {
    this.comService.getAllComments().subscribe(
      data => {
        this.comments =data;
      }
    )
  }


  nombreComments()
  {
    this.comService.countComments().subscribe(
      data =>{
        this.nbreComments = data;
        console.log(this.nbreComments);
      }
    )
  }

  listProjects()
  {
    this.projectService.getAllProject().subscribe(
      data => {
        this.projects = data;
      }
    )
  }




  deleteComment(id :number) 
  {
    Swal.fire({
      title: `Voulez vous supprimer ce commentaire  ?`,
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
        this.comService.deleteComment(id).subscribe( data => {
          console.log(data);
          
          Swal.fire(
            'Deleted!',
            'commentaire bien supprimé.',
            'success'
          )

          this.routes.navigate(['comments', id]);
        });

      }
    })

   
  }


}
