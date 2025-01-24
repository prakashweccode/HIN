import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadstepsComponent } from './leadsteps.component';

describe('LeadstepsComponent', () => {
  let component: LeadstepsComponent;
  let fixture: ComponentFixture<LeadstepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadstepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadstepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
