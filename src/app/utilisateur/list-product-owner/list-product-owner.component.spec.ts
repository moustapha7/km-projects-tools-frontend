import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductOwnerComponent } from './list-product-owner.component';

describe('ListProductOwnerComponent', () => {
  let component: ListProductOwnerComponent;
  let fixture: ComponentFixture<ListProductOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
