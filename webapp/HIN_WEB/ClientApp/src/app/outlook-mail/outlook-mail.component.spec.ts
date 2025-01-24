import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutlookMailComponent } from './outlook-mail.component';

describe('OutlookMailComponent', () => {
  let component: OutlookMailComponent;
  let fixture: ComponentFixture<OutlookMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutlookMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutlookMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
