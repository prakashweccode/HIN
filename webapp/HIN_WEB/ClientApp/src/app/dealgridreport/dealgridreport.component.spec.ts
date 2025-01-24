import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealgridreportComponent } from './dealgridreport.component';

describe('DealgridreportComponent', () => {
  let component: DealgridreportComponent;
  let fixture: ComponentFixture<DealgridreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealgridreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealgridreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
