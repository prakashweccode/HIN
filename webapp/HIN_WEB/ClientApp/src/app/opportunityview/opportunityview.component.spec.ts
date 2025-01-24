import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityviewComponent } from './opportunityview.component';

describe('OpportunityviewComponent', () => {
  let component: OpportunityviewComponent;
  let fixture: ComponentFixture<OpportunityviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
