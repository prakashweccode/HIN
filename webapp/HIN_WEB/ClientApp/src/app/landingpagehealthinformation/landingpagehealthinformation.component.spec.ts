import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpagehealthinformationComponent } from './landingpagehealthinformation.component';

describe('LandingpagehealthinformationComponent', () => {
  let component: LandingpagehealthinformationComponent;
  let fixture: ComponentFixture<LandingpagehealthinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingpagehealthinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingpagehealthinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
