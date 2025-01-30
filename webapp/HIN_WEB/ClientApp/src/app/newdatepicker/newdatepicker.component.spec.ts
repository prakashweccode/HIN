import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdatepickerComponent } from './newdatepicker.component';

describe('NewdatepickerComponent', () => {
  let component: NewdatepickerComponent;
  let fixture: ComponentFixture<NewdatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewdatepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewdatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
