import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDashboardConfigComponent } from './list-dashboard-config.component';

describe('ListDashboardConfigComponent', () => {
  let component: ListDashboardConfigComponent;
  let fixture: ComponentFixture<ListDashboardConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDashboardConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDashboardConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
