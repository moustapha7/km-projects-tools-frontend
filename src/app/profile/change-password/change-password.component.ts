import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePassword } from 'src/app/model/changePassword';
import { User } from 'src/app/model/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {


  addForm : FormGroup;
  user : User;
  errorMessage : '';
  currentUser: any;
  changePassword :  ChangePassword;
  submitted = false;


  constructor(private router : Router, private userService : UserService, private formBuilder: FormBuilder,private token: TokenStorageService) { }

  ngOnInit(): void {

    this.currentUser = this.token.getUser();
    this.addForm = this.formBuilder.group({
      username :  ['',  [Validators.required]],
      newPassword : ['',  [Validators.required, Validators.minLength(6)]],
      confirmNewPassword : ['',  [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.addForm.controls; }

  updatePassword()
  {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
       }


    this.userService.changePassword(this.addForm.value).subscribe(
      data => {
        Swal.fire({
          title: `password bien modifié`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigateByUrl('/profile');
      },
      err => {
        this.errorMessage = err.error.message;
       
      }
    );
    
  }

  onReset() {
    this.submitted = false;
    this.addForm.reset();
  }
}
