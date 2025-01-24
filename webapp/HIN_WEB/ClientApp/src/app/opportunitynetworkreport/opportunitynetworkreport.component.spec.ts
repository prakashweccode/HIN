import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitynetworkreportComponent } from './opportunitynetworkreport.component';

describe('OpportunitynetworkreportComponent', () => {
  let component: OpportunitynetworkreportComponent;
  let fixture: ComponentFixture<OpportunitynetworkreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitynetworkreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitynetworkreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
