import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddealsComponent } from './adddeals.component';

describe('AdddealsComponent', () => {
  let component: AdddealsComponent;
  let fixture: ComponentFixture<AdddealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
