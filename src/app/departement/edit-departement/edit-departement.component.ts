import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement } from 'src/app/model/departement';
import { DepartementService } from 'src/app/services/departement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-departement',
  templateUrl: './edit-departement.component.html',
  styleUrls: ['./edit-departement.component.css']
})
export class EditDepartementComponent implements OnInit {


  addForm : FormGroup;
  id : number;
  departement : Departement;
  errorMessage = '';
  submitted = false;

  constructor(private formBuilder : FormBuilder, private router : Router, private actroute : ActivatedRoute,
    private depService : DepartementService) { }

  ngOnInit(): void {
    this.id = this.actroute.snapshot.params['id'];
    this.depService.getDepartementById(this.id).subscribe(
      data => {
        this.departement = data;
      }
    )

    this.addForm = this.formBuilder.group({
      name : ['',   [Validators.required, Validators.minLength(2)]]
    });
  }

  get f() { return this.addForm.controls; }

  updateDepartement()
  {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
       }

    this.depService.updateDepartement(this.id,this.addForm.value).subscribe(
      data =>{
        Swal.fire({
          title: `departement bien modifié`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
      this.router.navigate(['list-departement']);

      },
      error => {
        console.log('error to update departement'); 
        this.errorMessage = error.error.message;

     }
    );
  }

}
