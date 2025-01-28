import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientformApprovedComponent } from './patientform-approved.component';

describe('PatientformApprovedComponent', () => {
  let component: PatientformApprovedComponent;
  let fixture: ComponentFixture<PatientformApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientformApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientformApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
