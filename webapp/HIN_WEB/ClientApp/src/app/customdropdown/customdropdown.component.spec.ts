import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomdropdownComponent } from './customdropdown.component';

describe('CustomdropdownComponent', () => {
  let component: CustomdropdownComponent;
  let fixture: ComponentFixture<CustomdropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomdropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
