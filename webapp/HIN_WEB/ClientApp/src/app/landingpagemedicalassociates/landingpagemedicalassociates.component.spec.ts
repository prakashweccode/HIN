import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpagemedicalassociatesComponent } from './landingpagemedicalassociates.component';

describe('LandingpagemedicalassociatesComponent', () => {
  let component: LandingpagemedicalassociatesComponent;
  let fixture: ComponentFixture<LandingpagemedicalassociatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingpagemedicalassociatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingpagemedicalassociatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
