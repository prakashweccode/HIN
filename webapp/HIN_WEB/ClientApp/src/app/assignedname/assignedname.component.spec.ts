import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignednameComponent } from './assignedname.component';

describe('AssignednameComponent', () => {
  let component: AssignednameComponent;
  let fixture: ComponentFixture<AssignednameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignednameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignednameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
