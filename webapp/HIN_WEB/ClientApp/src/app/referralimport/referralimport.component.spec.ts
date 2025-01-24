import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralimportComponent } from './referralimport.component';

describe('ReferralimportComponent', () => {
  let component: ReferralimportComponent;
  let fixture: ComponentFixture<ReferralimportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralimportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
