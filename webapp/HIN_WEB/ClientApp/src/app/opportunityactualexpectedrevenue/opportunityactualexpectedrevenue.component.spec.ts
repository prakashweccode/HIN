import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityactualexpectedrevenueComponent } from './opportunityactualexpectedrevenue.component';

describe('OpportunityactualexpectedrevenueComponent', () => {
  let component: OpportunityactualexpectedrevenueComponent;
  let fixture: ComponentFixture<OpportunityactualexpectedrevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityactualexpectedrevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityactualexpectedrevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
