import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomsectionComponent } from './customsection.component';

describe('CustomsectionComponent', () => {
  let component: CustomsectionComponent;
  let fixture: ComponentFixture<CustomsectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomsectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
