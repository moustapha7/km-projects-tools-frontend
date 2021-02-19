import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  form: any = {};
  client : Client;
  addForm : FormGroup;
  
  errorMessage : '';
  id :number;
  submitted = false;
  constructor( private router: Router, private formBuilder: FormBuilder, private actroute : ActivatedRoute, private clientService: ClientService) { }

  ngOnInit(): void {
    this.id = this.actroute.snapshot.params['id'];

    this.clientService.getClientById(this.id).subscribe(
      (data : Client)=> {
      this.client= data;
      });

      

    this.addForm = this.formBuilder.group({
      code : ['',  Validators.required],
      prenom : ['',  [Validators.required, Validators.minLength(2)]],
      nom :['',   [Validators.required, Validators.minLength(2)]],
      adresse :['',  [Validators.required, Validators.minLength(2)]],
      tel : ['',  [Validators.required, Validators.minLength(9)]],
      email : ['', [Validators.required, Validators.email]],

    });

  }

  get f() { return this.addForm.controls; }

  updateClient() {

    this.submitted = true;
    if (this.addForm.invalid) {
      return;
  }
 
    this.clientService.updateClient(this.id, this.addForm.value).subscribe(
      (data) => {
        Swal.fire({
          title: `client bien modifié`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['list-client']);
      },
      error => {
        console.log('error to update client');
        this.errorMessage = error.error.message;
      }
    );
  }

}
