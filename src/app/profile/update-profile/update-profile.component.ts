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

  constructor(private token: TokenStorageService, private userService : UserService, private router :Router,
    private formBuilder: FormBuilder, private acroute: ActivatedRoute, private depService: DepartementService) { }

  ngOnInit(): void {
    this.id= this.acroute.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
    })

    this.getAllDepatements();

    this.addForm = this.formBuilder.group({
      firstname: new FormControl('', Validators.minLength(4)),
      name: new FormControl('', Validators.minLength(4)),
      username: new FormControl('', Validators.minLength(4)),
      email:  new FormControl( (new Date()).toISOString().substring(0,10), Validators.required),
      password:  new FormControl('', Validators.minLength(4)),

      deprtement: new FormControl('', Validators.required),
     
    });

  }

  updateProfile()
  {
    this.user.departement = this.selectedDepartement;

    this.userService.updateUser(this.id,this.addForm.value).subscribe(
      data => {
        console.log(data);
       ;
        Swal.fire({
          title: `profile bien modifié`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate[("profile")];
       
      },
      err => {
       
        Swal.fire({
          title: `error to update profile`,
          icon: 'warning',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate[("update-profile")];
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

}
