import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTechLeadComponent } from './list-tech-lead.component';

describe('ListTechLeadComponent', () => {
  let component: ListTechLeadComponent;
  let fixture: ComponentFixture<ListTechLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTechLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTechLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
