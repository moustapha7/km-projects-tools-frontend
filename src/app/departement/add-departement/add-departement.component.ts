import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Departement } from 'src/app/model/departement';
import { DepartementService } from 'src/app/services/departement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-departement',
  templateUrl: './add-departement.component.html',
  styleUrls: ['./add-departement.component.css']
})
export class AddDepartementComponent implements OnInit {

  addForm : FormGroup;
  departement : Departement = new Departement();
  errorMessage= '';
  submitted = false;



  constructor(private depService : DepartementService, private router : Router, private formBuilder  : FormBuilder) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name : ['',   [Validators.required, Validators.minLength(2)]]
    });
  }

  get f() { return this.addForm.controls; }

  saveDepartement()
  {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
       }

    this.depService.createDepartement(this.addForm.value).subscribe(
      data =>{
        Swal.fire({
          title: `departement bien ajouté`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
      this.router.navigate(['list-departement']);

      },
      error => {
        console.log('error to save departement'); 
        this.errorMessage = error.error.message;

     }
    );
  }

  onReset() {
    this.submitted = false;
    this.addForm.reset();
  }

}
