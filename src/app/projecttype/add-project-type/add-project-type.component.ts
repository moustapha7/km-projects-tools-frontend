import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectType } from 'src/app/model/projectType';
import { ProjectTypeService } from 'src/app/services/project-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-project-type',
  templateUrl: './add-project-type.component.html',
  styleUrls: ['./add-project-type.component.css']
})
export class AddProjectTypeComponent implements OnInit {


  projectType : ProjectType = new ProjectType();
  addForm : FormGroup;
  submitted = false;
  loading = false;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  form: any = {};
  constructor(private router : Router, private proTypeService :ProjectTypeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: new FormControl('',  Validators.minLength(4))
    });

  }

  get f(){

    return this.addForm.controls;

  }

  saveProjectType()
  {
    this.loading = true;
    

          this.proTypeService.createProjectType(this.addForm.value).subscribe(
            result =>
            {
              Swal.fire({
                title: `Project Type bien ajouté`,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
                
              });
              console.log(result);
            },
             error => {
                console.log('error to save post'); 
                Swal.fire({
                  title: `error to save post`,
                  icon: 'warning',
                  showConfirmButton: false,
                  timer: 1500
                  
                });
             }
          );
        this.router.navigate(['add-project-type']);

  }

}
