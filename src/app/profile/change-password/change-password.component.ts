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
  constructor(private router : Router, private userService : UserService, private formBuilder: FormBuilder,private token: TokenStorageService) { }

  ngOnInit(): void {

    this.currentUser = this.token.getUser();
    this.addForm = this.formBuilder.group({
      username : new FormControl(),
      newPassword : new FormControl('', Validators.required),
      confirmNewPassword : new FormControl('', Validators.required)
    });
  }

  updatePassword()
  {
    this.userService.changePassword(this.addForm.value).subscribe(
      data => {
        Swal.fire({
          title: `password bien modifié`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate[('profile')];
      },
      err => {
        this.errorMessage = err.error.message;
       
      }
    );
    
  }
}
