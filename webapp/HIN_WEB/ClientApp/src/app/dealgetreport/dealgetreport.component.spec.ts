import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealgetreportComponent } from './dealgetreport.component';

describe('DealgetreportComponent', () => {
  let component: DealgetreportComponent;
  let fixture: ComponentFixture<DealgetreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealgetreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealgetreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
