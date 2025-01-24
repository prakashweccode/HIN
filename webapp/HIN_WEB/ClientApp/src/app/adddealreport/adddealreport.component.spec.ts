import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddealreportComponent } from './adddealreport.component';

describe('AdddealreportComponent', () => {
  let component: AdddealreportComponent;
  let fixture: ComponentFixture<AdddealreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddealreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddealreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
