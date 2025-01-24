import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarselectComponent } from './calendarselect.component';

describe('CalendarselectComponent', () => {
  let component: CalendarselectComponent;
  let fixture: ComponentFixture<CalendarselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
