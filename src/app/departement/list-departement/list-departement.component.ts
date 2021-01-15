import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Departement } from 'src/app/model/departement';
import { AuthService } from 'src/app/services/auth.service';
import { DepartementService } from 'src/app/services/departement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-departement',
  templateUrl: './list-departement.component.html',
  styleUrls: ['./list-departement.component.css']
})
export class ListDepartementComponent implements OnInit {

  departements : Departement[];
  constructor(private depService : DepartementService, private router : Router) { }

  ngOnInit(): void {
    this.listDepartements();
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
