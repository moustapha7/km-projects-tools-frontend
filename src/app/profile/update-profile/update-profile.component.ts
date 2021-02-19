import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement } from 'src/app/model/departement';
import { User } from 'src/app/model/user';
import { DepartementService } from 'src/app/services/departement.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {


  
  id:number;
  user : User;
  
  addForm: FormGroup;
  form: any = {};
  selectedDepartement:Departement;

  departements: Departement[];
  currentUser: any;

  errorMessage = '';

  submitted = false;

  constructor(private token: TokenStorageService, private userService : UserService, private router :Router,
    private formBuilder: FormBuilder, private acroute: ActivatedRoute, private depService: DepartementService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();

    this.id= this.acroute.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(data => {
      this.currentUser = data;
    })

    this.getAllDepatements();

    this.addForm = this.formBuilder.group({
      firstname:  ['',  [Validators.required, Validators.minLength(2)]],
      name:  ['',  [Validators.required, Validators.minLength(2)]],
      username:  ['',  [Validators.required, Validators.minLength(2)]],
      email:   ['',  [Validators.email, Validators.minLength(6)]],

     
    });

  }

  get f() { return this.addForm.controls; }

  updateProfile()
  {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
       }

    this.userService.updateUser(this.addForm.value).subscribe(
      data => {
        console.log(data);
       
        Swal.fire({
          title: `profile bien modifié`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        this.logout();
    
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage)
        
      }
    );
   
  }

  getAllDepatements()
  {
    this.depService.getAllDepartement().subscribe(
      data =>{
        this.departements= data;
      }
    )
  }


  logout(): void {
    this.token.signOut();
    
    window.location.reload();
   
   
  }

  onReset() {
    this.submitted = false;
    this.addForm.reset();
  }

  
}
