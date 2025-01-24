import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityeventreportComponent } from './opportunityeventreport.component';

describe('OpportunityeventreportComponent', () => {
  let component: OpportunityeventreportComponent;
  let fixture: ComponentFixture<OpportunityeventreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityeventreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityeventreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
