import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectTypeService } from 'src/app/services/project-type.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-project-type',
  templateUrl: './list-project-type.component.html',
  styleUrls: ['./list-project-type.component.css']
})
export class ListProjectTypeComponent implements OnInit {

  projectTypes;

  isAdmin = false;
  isDev = false;
  isPOwner = false ;
  isTechLead = false;
  isLoggedIn = true;
  private roles: string[];
  constructor(private proTypeService :ProjectTypeService, private router : Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this. listProjectType();

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

  listProjectType(){
    this.proTypeService.getAllProjectType().subscribe(
      data =>{
        this.projectTypes = data;
      }
    )

  }

  editProjectType(id : number)
  {

    this.router.navigate(['edit-project-type', id]);
  }



  deleteProjectType(id :number)
  {

    Swal.fire({
      title: `Voulez vous supprimer ce type de projet  ?`,
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
        this.proTypeService.deleteProjectType(id).subscribe( data => {
          console.log(data);
          
          Swal.fire(
            'Deleted!',
            'project type bien supprimé.',
            'success'
          )

          this.listProjectType();
        })

      }
    })


  }




}
