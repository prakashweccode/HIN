import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitypartnerreportComponent } from './opportunitypartnerreport.component';

describe('OpportunitypartnerreportComponent', () => {
  let component: OpportunitypartnerreportComponent;
  let fixture: ComponentFixture<OpportunitypartnerreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitypartnerreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitypartnerreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
