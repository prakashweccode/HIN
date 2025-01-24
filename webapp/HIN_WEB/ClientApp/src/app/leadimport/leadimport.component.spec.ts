import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadimportComponent } from './leadimport.component';

describe('LeadimportComponent', () => {
  let component: LeadimportComponent;
  let fixture: ComponentFixture<LeadimportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadimportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
