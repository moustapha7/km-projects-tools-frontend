import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeveloppeurComponent } from './list-developpeur.component';

describe('ListDeveloppeurComponent', () => {
  let component: ListDeveloppeurComponent;
  let fixture: ComponentFixture<ListDeveloppeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDeveloppeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeveloppeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
