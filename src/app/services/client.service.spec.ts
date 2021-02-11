import {  TestBed } from '@angular/core/testing';
import { ClientService } from './client.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Client } from '../model/client';
import { RouterModule } from '@angular/router';

describe('ClientService', () => {

  let clientService: ClientService;
    let httpMock : HttpTestingController;
    let  injector: TestBed;

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

  it('return an Observable<Client[]>', () =>
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
     
       ];

       clientService.getAllClients().subscribe(
           (clients) => {
               expect(clients.length).toBe(2);
               expect(clients).toEqual(clientItem);
           }
       );

        const req = httpMock.expectOne('http://localhost:8080/api/clients');
        expect(req.request.method).toBe("GET");
        req.flush(clientItem);
    httpMock.verify();


  //  expect(clientService).toBeTruthy();
    
  });

  it('should get the correct star wars character', () => {
    clientService.getClientById(1).subscribe((data: any) => {
      expect(data.code).toBe('Cli_15');
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/clients/1`);
    expect(req.request.method).toBe('GET');

    req.flush({
      code: 'Cli_15'
    });

    httpMock.verify();
  });
  
  
});