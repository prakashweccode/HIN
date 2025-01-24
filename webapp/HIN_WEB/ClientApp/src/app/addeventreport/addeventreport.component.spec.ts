import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeventreportComponent } from './addeventreport.component';

describe('AddeventreportComponent', () => {
  let component: AddeventreportComponent;
  let fixture: ComponentFixture<AddeventreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeventreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeventreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
