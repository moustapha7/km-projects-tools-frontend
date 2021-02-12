import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Departement } from '../model/departement';
import { SignUpInfo } from '../model/sign-up-info';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  signupInfo:SignUpInfo;

  selectedDepartement : Departement;
  departements : Departement[];


  constructor(private authService: AuthService, private router : Router) { }

  ngOnInit(): void {
    this.getAllDepatements();
  }

  onSubmit(): void {

    this.signupInfo = new SignUpInfo(
      this.form.firstname,
      this.form.name,
  		this.form.username,
      this.form.email,
      this.form.password,
      this.form.confirmPassword,
      this.form.departement);
      
    this.signupInfo.departement = this.selectedDepartement;

    if(this.form.password !== this.form.confirmPassword )
    {
      Swal.fire({
        title: `veuillez confirmer votre password`,
        icon: 'warning',
        showConfirmButton: false,
        timer: 3000,
      });
      this.router.navigate(['register']);
    }
    else
    {
      this.authService.register(this.signupInfo).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;

          Swal.fire({
            title: `registration successful`,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['register-confirm']);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          this.isSuccessful = false;

          Swal.fire({
            title: `registration failled`,
            icon: 'warning',
            showConfirmButton: false,
            timer: 3000,
          });
          this.router.navigate(['register']);
        }
      );

    }
    
  }

  getAllDepatements()
  {
    this.authService.getAllDepartement().subscribe(
      data =>{
        this.departements= data;
      }
    )
  }







}
