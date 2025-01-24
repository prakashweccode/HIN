import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorimportComponent } from './vendorimport.component';

describe('VendorimportComponent', () => {
  let component: VendorimportComponent;
  let fixture: ComponentFixture<VendorimportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorimportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
