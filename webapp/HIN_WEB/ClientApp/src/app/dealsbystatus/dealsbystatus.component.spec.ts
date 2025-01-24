import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsbystatusComponent } from './dealsbystatus.component';

describe('DealsbystatusComponent', () => {
  let component: DealsbystatusComponent;
  let fixture: ComponentFixture<DealsbystatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsbystatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsbystatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
