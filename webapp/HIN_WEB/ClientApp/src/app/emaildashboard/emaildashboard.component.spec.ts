import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmaildashboardComponent } from './emaildashboard.component';

describe('EmaildashboardComponent', () => {
  let component: EmaildashboardComponent;
  let fixture: ComponentFixture<EmaildashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmaildashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmaildashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
