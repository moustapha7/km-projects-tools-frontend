import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientService } from 'src/app/services/client.service';
import * as Rx from 'rxjs';
import { delay } from "rxjs/operators";
import { ListClientComponent } from './list-client.component';

describe('ListClientComponent', () => {
  let component: ListClientComponent;
  let fixture: ComponentFixture<ListClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListClientComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers : [
        ClientService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ListClientComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    const fixture = TestBed.createComponent(ListClientComponent);
    const component = fixture.debugElement.componentInstance;
    let spy_listClients = spyOn(component,"listClients").and.returnValue([]);
    component.ngOnInit();
    expect(component.clients).toEqual([]);
  });

  it('should call listClients and get response as empty array', fakeAsync(() => {
    const fixture = TestBed.createComponent(ListClientComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(ClientService);
    let spy_getAllClients = spyOn(service,"getAllClients").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.listClients();
    tick(100);
    expect(component.clients).toEqual([]);
  }));

 /*  it('should call listClients and get response as array', fakeAsync(() => {
    const fixture = TestBed.createComponent(ListClientComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(ClientService);
    let spy_getAllClients = spyOn(service,"getAllClients").and.callFake(() => {
      return Rx.of([{id : 100}]).pipe(delay(2000));
    });
    component.listClients();
    tick(1000);
    expect(component.showLoadingIndicator).toEqual(true);
    tick(1000);
    expect(component.showLoadingIndicator).toEqual(false);
    expect(component.clients).toEqual([{id : 100}]);
  })) */
});
