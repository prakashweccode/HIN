import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFileExplorerComponent } from './patient-file-explorer.component';

describe('PatientFileExplorerComponent', () => {
  let component: PatientFileExplorerComponent;
  let fixture: ComponentFixture<PatientFileExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientFileExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFileExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
