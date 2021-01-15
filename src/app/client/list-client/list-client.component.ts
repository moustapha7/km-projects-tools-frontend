import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  client : Client;
  clients : Client[];
  constructor(public clientService: ClientService, private router : Router) { }

  ngOnInit(): void {
    this.listClients();
  }

  listClients()
  {
    this.clientService.getAllClients().subscribe(
      result => {
        this.clients = result;
      }
    )
    
  }

  updateClient(id : number)  {
 
    this.router.navigate(['edit-client', id]);
  }

  deleteClient(id :number) 
  {
    Swal.fire({
      title: `Voulez vous supprimer ce client  ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => 
    {
      if (result.isConfirmed)
      {
        this.clientService.deleteClient(id).subscribe( data => {
          console.log(data);
          
          Swal.fire(
            'Deleted!',
            'client bien supprimé.',
            'success'
          )

          this.listClients();
        })

      }
    })

   
  }


}
