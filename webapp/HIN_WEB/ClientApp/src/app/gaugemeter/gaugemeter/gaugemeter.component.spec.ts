import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugemeterComponent } from './gaugemeter.component';

describe('GaugemeterComponent', () => {
  let component: GaugemeterComponent;
  let fixture: ComponentFixture<GaugemeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaugemeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugemeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
