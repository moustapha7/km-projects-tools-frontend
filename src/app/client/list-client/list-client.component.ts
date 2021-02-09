import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/client.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  client : Client;
  clients : Client[];

  isAdmin = false;
  isDev = false;
  isPOwner = false ;
  isTechLead = false;
  isLoggedIn = true;
  title = "List Client Component";
  private roles: string[];
 
  constructor(public clientService: ClientService, private router : Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.listClients();

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    //  this.isConnecte = this.tokenStorageService.getToken();
  
      if (this.isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;
  
  
        this.isAdmin =this.roles.includes('ROLE_ADMIN');
        this.isDev =this.roles.includes('ROLE_DEV');
        this.isTechLead =this.roles.includes('ROLE_TEACHLEAD');
        this.isPOwner =this.roles.includes('ROLE_POWNER');
  

        
      }  
  }

  listClients()
  {
    this.clientService.getAllClients().subscribe(
      result => {
        this.clients = result;
      }
    )
    
  }

  detailClient(id :number)
  {
    this.router.navigate(['detail-client',id]);
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
