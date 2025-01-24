import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualamountComponent } from './actualamount.component';

describe('ActualamountComponent', () => {
  let component: ActualamountComponent;
  let fixture: ComponentFixture<ActualamountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualamountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualamountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
