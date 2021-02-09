import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TeamService } from 'src/app/services/team.service';

import { ListTeamComponent } from './list-team.component';

describe('ListTeamComponent', () => {
  let component: ListTeamComponent;
  let fixture: ComponentFixture<ListTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTeamComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers : [
        TeamService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ListTeamComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    const fixture = TestBed.createComponent(ListTeamComponent);
    const component = fixture.debugElement.componentInstance;
    component.ngOnInit();
    expect(component.teams).toEqual([]);
  });

  it('should call listTeams and get response as empty array', fakeAsync(() => {
    const fixture = TestBed.createComponent(ListTeamComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(TeamService);
    component.liistTeams();
    tick(100);
    expect(component.teams).toEqual([]);
  }));

});
