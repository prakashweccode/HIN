import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityvendorreportComponent } from './opportunityvendorreport.component';

describe('OpportunityvendorreportComponent', () => {
  let component: OpportunityvendorreportComponent;
  let fixture: ComponentFixture<OpportunityvendorreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityvendorreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityvendorreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
