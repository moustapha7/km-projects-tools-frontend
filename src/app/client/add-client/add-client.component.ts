import { Component, OnInit } from '@angular/core';
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


  client : Client = new Client();

  constructor(public clientService: ClientService, private router : Router) { }

  ngOnInit(): void {
  }

  saveClient()
  {
    this.clientService.createClient(this.client).subscribe(
      result =>
      {
      
        if (this.client.id > 0) {
          Swal.fire({
            title: `client bien ajouté`,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })

        }
        this.router.navigate(['list-client']);
      }
    )
    

  }



}
