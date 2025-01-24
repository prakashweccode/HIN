import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedtoComponent } from './assignedto.component';

describe('AssignedtoComponent', () => {
  let component: AssignedtoComponent;
  let fixture: ComponentFixture<AssignedtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
