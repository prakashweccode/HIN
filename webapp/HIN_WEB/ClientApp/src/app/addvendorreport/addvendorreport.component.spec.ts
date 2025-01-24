import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvendorreportComponent } from './addvendorreport.component';

describe('AddvendorreportComponent', () => {
  let component: AddvendorreportComponent;
  let fixture: ComponentFixture<AddvendorreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddvendorreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvendorreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
