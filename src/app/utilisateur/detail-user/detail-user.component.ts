import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/model/role';
import { User } from 'src/app/model/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  id:number;
  user : User;
  currentUser: any;

  isAdmin = false;
  isDev = false;
  isPOwner = false ;
  isTechLead = false;
  isLoggedIn = true;
  private roles: string[];

  roless;
  selectedRole : Role;
  addForm: FormGroup;
  errorMessage= '';
  dev;
  powner;
  teachlead;
  admin;
  submitted = false;

  constructor(private acroute: ActivatedRoute,  public userService :UserService,private router: Router, private formBuilder: FormBuilder,
             private token: TokenStorageService) { }

  ngOnInit(): void {
    this.id= this.acroute.snapshot.params['id'];
    this.currentUser = this.token.getUser();

    this.listRoles();

    this.user = new User();
    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
    })

    this.isLoggedIn = !!this.token.getToken();
    //  this.isConnecte = this.tokenStorageService.getToken();
  
      if (this.isLoggedIn) {
        const user = this.token.getUser();
        this.roles = user.roles;
  
  
        this.isAdmin =this.roles.includes('ROLE_ADMIN');
        this.isDev =this.roles.includes('ROLE_DEV');
        this.isTechLead =this.roles.includes('ROLE_TEACHLEAD');
        this.isPOwner =this.roles.includes('ROLE_POWNER');
  

        
      }
      
      this.addForm = this.formBuilder.group({
        role:  ['',   Validators.required],
       
      }); 
  }

  get f() {
    return this.addForm.controls;
  }

  updateRole()
  {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
       }

    this.userService.updateRoleUser(this.id,this.addForm.value).subscribe(
      data => {
        console.log(data);
        Swal.fire({
          title: `Role bien modifié`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['list-user']);

      },
      err => {
        this.errorMessage = err.error.message;
       
      }
    )
  }

  listRoles()
  {
    this.userService.getAllRoles().subscribe(
      data => {
        this.roless = data;
      }
    )
  }


}
