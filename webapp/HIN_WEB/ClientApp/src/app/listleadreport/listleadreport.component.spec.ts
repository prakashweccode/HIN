import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListleadreportComponent } from './listleadreport.component';

describe('ListleadreportComponent', () => {
  let component: ListleadreportComponent;
  let fixture: ComponentFixture<ListleadreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListleadreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListleadreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
