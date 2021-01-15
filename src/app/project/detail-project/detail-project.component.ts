import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.css']
})
export class DetailProjectComponent implements OnInit {

  id:number;
  project :Project;
  constructor(private acroute: ActivatedRoute, private projectService : ProjectService, private routes : Router) { }

  ngOnInit(): void {
    this.id= this.acroute.snapshot.params['id'];

  //  this.project = new Project();
    this.projectService.getProjectById(this.id).subscribe(data => {
      this.project = data;
    })
    
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

          this.routes.navigate(['detail-project', id]);
        });

      }
    })

   
  }
}
