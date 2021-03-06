import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectType } from 'src/app/model/projectType';
import { ProjectTypeService } from 'src/app/services/project-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-project-type',
  templateUrl: './edit-project-type.component.html',
  styleUrls: ['./edit-project-type.component.css'],
})
export class EditProjectTypeComponent implements OnInit {
  id: number;
  projectType: ProjectType;

  addForm: FormGroup;
  submitted = false;
  form: any = {};
  errorMessage = '';
  
  constructor(
    private actroute: ActivatedRoute,
    private router: Router,
    private proTypeService: ProjectTypeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = this.actroute.snapshot.params['id'];

    this.proTypeService
      .getProjectTypeById(this.id)
      .subscribe((data: ProjectType) => {
        this.projectType = data;
      });

    this.addForm = this.formBuilder.group({
      name : ['',   [Validators.required, Validators.minLength(2)]]
    });
  }

  get f() {
    return this.addForm.controls;
  }

  updateProjectType() {

    this.submitted = true;

    if (this.addForm.invalid) {
      return;
       }
       
    this.proTypeService
      .updateProjectType(this.id, this.addForm.value)
      .subscribe(
        (data) => {
          Swal.fire({
            title: `project Type bien modifié`,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['list-project-type']);
        },
        error => {
          this.errorMessage = error.error.message;
        }
      );
  }
}
