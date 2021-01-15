import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  form: any = {};
  client : Client = new Client();
  addForm : FormGroup;


  constructor(public clientService: ClientService, private router : Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      
      prenom : new FormControl('',  Validators.minLength(4)),
      nom :new FormControl('',  Validators.minLength(4)),
      adresse :new FormControl('',  Validators.minLength(4)),
      tel : new FormControl('',  Validators.minLength(4)),
      email :new FormControl('',  Validators.email),

    });

  }

  saveClient()
  {
    this.clientService.createClient(this.addForm.value).subscribe(
      result =>
      {
    
          Swal.fire({
            title: `client bien ajouté`,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
        this.router.navigate(['list-client']);
      },
      error => {
         console.log('error to save client'); 
         Swal.fire({
           title: `error to save client`,
           icon: 'warning',
           showConfirmButton: false,
           timer: 1500
           
         });
         this.router.navigate(['add-client']);

      }
     
    )
    

  }



}
