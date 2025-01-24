import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnetworkreportComponent } from './addnetworkreport.component';

describe('AddnetworkreportComponent', () => {
  let component: AddnetworkreportComponent;
  let fixture: ComponentFixture<AddnetworkreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnetworkreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnetworkreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
