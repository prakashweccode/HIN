import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddreferralreportComponent } from './addreferralreport.component';

describe('AddreferralreportComponent', () => {
  let component: AddreferralreportComponent;
  let fixture: ComponentFixture<AddreferralreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddreferralreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddreferralreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
