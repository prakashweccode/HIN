import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsclosedbyquarterComponent } from './dealsclosedbyquarter.component';

describe('DealsclosedbyquarterComponent', () => {
  let component: DealsclosedbyquarterComponent;
  let fixture: ComponentFixture<DealsclosedbyquarterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsclosedbyquarterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsclosedbyquarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
