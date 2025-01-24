import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeselectComponent } from './rangeselect.component';

describe('RangeselectComponent', () => {
  let component: RangeselectComponent;
  let fixture: ComponentFixture<RangeselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
