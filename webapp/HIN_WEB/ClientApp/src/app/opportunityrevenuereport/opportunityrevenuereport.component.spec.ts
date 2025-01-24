import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityrevenuereportComponent } from './opportunityrevenuereport.component';

describe('OpportunityrevenuereportComponent', () => {
  let component: OpportunityrevenuereportComponent;
  let fixture: ComponentFixture<OpportunityrevenuereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityrevenuereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityrevenuereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
