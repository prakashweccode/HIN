import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitycostandcustomerreportComponent } from './opportunitycostandcustomerreport.component';

describe('OpportunitycostandcustomerreportComponent', () => {
  let component: OpportunitycostandcustomerreportComponent;
  let fixture: ComponentFixture<OpportunitycostandcustomerreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitycostandcustomerreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitycostandcustomerreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
