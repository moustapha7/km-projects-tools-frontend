import {  TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { DepartementService } from './departement.service';
import { Departement } from '../model/departement';

describe('DepartementService', () => {

  let service: DepartementService;
    let httpMock : HttpTestingController;
    let  injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
            RouterModule.forRoot([]),          ],
          providers: [
            DepartementService
          ]
    });
   


    service = TestBed.get(DepartementService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('return an Observable<Departement[]>', () =>
   {
       const depItem :Departement[] = [
        {
          "id": 1,
          "name": "informatique",
      },
      {
        "id": 2,
        "name": "reseau",
      },
     
       ];

       service.getAllDepartement().subscribe(
           (departements) => {
               expect(departements.length).toBe(2);
               expect(departements).toEqual(depItem);
           }
       );

        const req = httpMock.expectOne('http://localhost:8080/api/departements');
        expect(req.request.method).toBe("GET");
        req.flush(depItem);
    httpMock.verify();

    
  });
  
  
});