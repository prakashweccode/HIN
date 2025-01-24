import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitieswonovertimeComponent } from './opportunitieswonovertime.component';

describe('OpportunitieswonovertimeComponent', () => {
  let component: OpportunitieswonovertimeComponent;
  let fixture: ComponentFixture<OpportunitieswonovertimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitieswonovertimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitieswonovertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
