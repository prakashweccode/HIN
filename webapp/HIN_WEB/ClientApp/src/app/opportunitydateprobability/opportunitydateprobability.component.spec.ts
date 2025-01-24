import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitydateprobabilityComponent } from './opportunitydateprobability.component';

describe('OpportunitydateprobabilityComponent', () => {
  let component: OpportunitydateprobabilityComponent;
  let fixture: ComponentFixture<OpportunitydateprobabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitydateprobabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitydateprobabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
