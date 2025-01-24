import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsclosedbymonthComponent } from './dealsclosedbymonth.component';

describe('DealsclosedbymonthComponent', () => {
  let component: DealsclosedbymonthComponent;
  let fixture: ComponentFixture<DealsclosedbymonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsclosedbymonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsclosedbymonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
