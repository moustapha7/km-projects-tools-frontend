import { async, inject, TestBed } from '@angular/core/testing';
import { ClientService } from './client.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Client } from '../model/client';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';

describe('ClientService', () => {

  let clientService: ClientService;
    let httpMock : HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
            RouterModule.forRoot([]),          ],
          providers: [
            ClientService
          ]
    });
   
  //  clentService = TestBed.inject(ClientService);
    clientService = TestBed.get(ClientService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('be able to retrieve clients from the API bia GET', () =>
   {
       const clientItem :Client[] = [
        {
          "id": 1,
          "code": "Cli_15",
          "prenom": "Diamila",
          "nom": "Dieye",
          "adresse": "keur massar",
          "tel": "77 111 44 55",
          "email": "diami@gmail.com"
      },
      {
          "id": 2,
          "code": "Cli_19",
          "prenom": "dame",
          "nom": "diouf",
          "adresse": "Dakar",
          "tel": "77 555 88 44",
          "email": "dame@gmail.com"
      },
      {
          "id": 4,
          "code": "Cli_14",
          "prenom": "Samba",
          "nom": "dieye",
          "adresse": "medina",
          "tel": "77 442 26 69",
          "email": "samba@gmail.com"
      },
      {
          "id": 5,
          "code": "Cli_38",
          "prenom": "maty",
          "nom": "samb",
          "adresse": "Pikine",
          "tel": "77 844 55 51",
          "email": "maty@gmail.com"
      }

       ];

       clientService.getAllClients().subscribe(
           (clients:any) => {
               expect(clients.lenght).toBe(4);
               expect(clients).toEqual(clientItem);
           }
       );

        const req = httpMock.expectOne('http://localhost:8080/api/clients');
        expect(req.request.method).toBe("GET");
        req.flush(clientItem);
   //     httpMock.verify();


  //  expect(clientService).toBeTruthy();
    
  });

  afterEach(() => {
    httpMock.verify();
});
  
});