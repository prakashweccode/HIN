import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsclosedbycustomerComponent } from './proposalsclosedbycustomer.component';

describe('ProposalsclosedbycustomerComponent', () => {
  let component: ProposalsclosedbycustomerComponent;
  let fixture: ComponentFixture<ProposalsclosedbycustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalsclosedbycustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalsclosedbycustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
