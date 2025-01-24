import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerimportComponent } from './partnerimport.component';

describe('PartnerimportComponent', () => {
  let component: PartnerimportComponent;
  let fixture: ComponentFixture<PartnerimportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerimportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
