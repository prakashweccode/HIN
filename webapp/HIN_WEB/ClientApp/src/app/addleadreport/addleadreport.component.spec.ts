import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddleadreportComponent } from './addleadreport.component';

describe('AddleadreportComponent', () => {
  let component: AddleadreportComponent;
  let fixture: ComponentFixture<AddleadreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddleadreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddleadreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
