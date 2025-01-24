import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralstepsComponent } from './referralsteps.component';

describe('ReferralstepsComponent', () => {
  let component: ReferralstepsComponent;
  let fixture: ComponentFixture<ReferralstepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralstepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralstepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
