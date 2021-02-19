import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CodeOtp } from '../model/codeOtp';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.css']
})
export class RegisterConfirmComponent implements OnInit {

  errorMessage = '';
  addForm: FormGroup;
  submitted = false;

  codeOtp : CodeOtp =new CodeOtp();

  constructor( private authService : AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.addForm = this.formBuilder.group({
      username:  ['',   Validators.required],
      codeOtp: ['',   Validators.required]
    }); 
  }

  get f() {
    return this.addForm.controls;
  }

  verifCode()
  {

    this.submitted = true;

    if (this.addForm.invalid) {
      return;
       }
       

    this.authService.checkCode(this.addForm.value).subscribe(
      data => {
        console.log(data);
        Swal.fire({
          title: `compte validé`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['login']);

      },
      err => {
        this.errorMessage = err.error.message;
        this.router.navigate(['register-confirm']);
      }
    )
  }

}
