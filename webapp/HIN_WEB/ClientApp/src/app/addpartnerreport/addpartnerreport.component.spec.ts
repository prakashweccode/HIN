import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpartnerreportComponent } from './addpartnerreport.component';

describe('AddpartnerreportComponent', () => {
  let component: AddpartnerreportComponent;
  let fixture: ComponentFixture<AddpartnerreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpartnerreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpartnerreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
