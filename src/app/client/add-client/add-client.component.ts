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
  errorMessage : '';
  submitted = false;

  constructor(public clientService: ClientService, private router : Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      
      prenom : ['',  [Validators.required, Validators.minLength(2)]],
      nom :['',   [Validators.required, Validators.minLength(2)]],
      adresse :['',  [Validators.required, Validators.minLength(2)]],
      tel : ['',  [Validators.required, Validators.minLength(9)]],
      email : ['', [Validators.required, Validators.email]],

    });

  }
  get f() { return this.addForm.controls; }

  saveClient()
  {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
       }

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
         this.errorMessage = error.error.message;
        

      }
     
    )
    

  }

  onReset() {
    this.submitted = false;
    this.addForm.reset();
  }



}
