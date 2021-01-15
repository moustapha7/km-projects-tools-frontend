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
  
  id :number;
  constructor( private router: Router, private formBuilder: FormBuilder, private actroute : ActivatedRoute, private clientService: ClientService) { }

  ngOnInit(): void {
    this.id = this.actroute.snapshot.params['id'];

    this.clientService.getClientById(this.id).subscribe(
      (data : Client)=> {
      this.client= data;
      });


    this.addForm = this.formBuilder.group({
      code : new FormControl,
      prenom : new FormControl('',  Validators.minLength(4)),
      nom :new FormControl('',  Validators.minLength(4)),
      adresse :new FormControl('',  Validators.minLength(4)),
      tel : new FormControl('',  Validators.minLength(4)),
      email :new FormControl('',  Validators.email),

    });

  }

  updateClient() {

 
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
      (error) => {
        console.log('error to update client');
        Swal.fire({
          title: `error to update client`,
          icon: 'warning',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['edit-client']);
      }
    );
  }

}
