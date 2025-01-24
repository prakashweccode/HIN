import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnetworkingComponent } from './addnetworking.component';

describe('AddnetworkingComponent', () => {
  let component: AddnetworkingComponent;
  let fixture: ComponentFixture<AddnetworkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnetworkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnetworkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
