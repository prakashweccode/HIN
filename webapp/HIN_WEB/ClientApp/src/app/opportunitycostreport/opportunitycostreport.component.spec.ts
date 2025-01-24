import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitycostreportComponent } from './opportunitycostreport.component';

describe('OpportunitycostreportComponent', () => {
  let component: OpportunitycostreportComponent;
  let fixture: ComponentFixture<OpportunitycostreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitycostreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitycostreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
