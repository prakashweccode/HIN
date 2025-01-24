import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfcalendarComponent } from './sfcalendar.component';

describe('SfcalendarComponent', () => {
  let component: SfcalendarComponent;
  let fixture: ComponentFixture<SfcalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfcalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
