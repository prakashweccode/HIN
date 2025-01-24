import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduserreportComponent } from './adduserreport.component';

describe('AdduserreportComponent', () => {
  let component: AdduserreportComponent;
  let fixture: ComponentFixture<AdduserreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdduserreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduserreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
