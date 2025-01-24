import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedtogridComponent } from './assignedtogrid.component';

describe('AssignedtogridComponent', () => {
  let component: AssignedtogridComponent;
  let fixture: ComponentFixture<AssignedtogridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedtogridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedtogridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
