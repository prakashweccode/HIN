import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueforecostbyrepComponent } from './revenueforecostbyrep.component';

describe('RevenueforecostbyrepComponent', () => {
  let component: RevenueforecostbyrepComponent;
  let fixture: ComponentFixture<RevenueforecostbyrepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueforecostbyrepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueforecostbyrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
