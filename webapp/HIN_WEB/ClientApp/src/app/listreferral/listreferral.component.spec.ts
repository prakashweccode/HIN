import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListreferralComponent } from './listreferral.component';

describe('ListreferralComponent', () => {
  let component: ListreferralComponent;
  let fixture: ComponentFixture<ListreferralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListreferralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListreferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
