import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityreferralreportComponent } from './opportunityreferralreport.component';

describe('OpportunityreferralreportComponent', () => {
  let component: OpportunityreferralreportComponent;
  let fixture: ComponentFixture<OpportunityreferralreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityreferralreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityreferralreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
