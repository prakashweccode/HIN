import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventstepsComponent } from './eventsteps.component';

describe('EventstepsComponent', () => {
  let component: EventstepsComponent;
  let fixture: ComponentFixture<EventstepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventstepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventstepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
