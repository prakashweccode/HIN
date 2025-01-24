import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorstepsComponent } from './vendorsteps.component';

describe('VendorstepsComponent', () => {
  let component: VendorstepsComponent;
  let fixture: ComponentFixture<VendorstepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorstepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorstepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
