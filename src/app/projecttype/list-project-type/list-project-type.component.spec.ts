import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjectTypeComponent } from './list-project-type.component';

describe('ListProjectTypeComponent', () => {
  let component: ListProjectTypeComponent;
  let fixture: ComponentFixture<ListProjectTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProjectTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
