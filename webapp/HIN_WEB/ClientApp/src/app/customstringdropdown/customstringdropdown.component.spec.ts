import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomstringdropdownComponent } from './customstringdropdown.component';

describe('CustomstringdropdownComponent', () => {
  let component: CustomstringdropdownComponent;
  let fixture: ComponentFixture<CustomstringdropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomstringdropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomstringdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
