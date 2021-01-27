import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Departement } from 'src/app/model/departement';
import { AuthService } from 'src/app/services/auth.service';
import { DepartementService } from 'src/app/services/departement.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-departement',
  templateUrl: './list-departement.component.html',
  styleUrls: ['./list-departement.component.css']
})
export class ListDepartementComponent implements OnInit {

  departements : Departement[];

  isAdmin = false;
  isDev = false;
  isPOwner = false ;
  isTechLead = false;
  isLoggedIn = true;
  private roles: string[];
 
  constructor(private depService : DepartementService, private router : Router,  private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.listDepartements();

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

  listDepartements()
  {
    this.depService.getAllDepartement().subscribe(
      data => {
        this.departements = data;
      }
    )
  }

  updateDepartement(id : number)
  {
    this.router.navigate(['edit-departement',id]);
  }

  deleteDepartement(id :number)
  {

    Swal.fire({
      title: `Voulez vous supprimer ce departement ?`,
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
        this.depService.deleteDepartement(id).subscribe( data => {
          console.log(data);
          
          Swal.fire(
            'Deleted!',
            'departement bien supprimé.',
            'success'
          )

          this.listDepartements();
        })

      }
    })


  }




}
