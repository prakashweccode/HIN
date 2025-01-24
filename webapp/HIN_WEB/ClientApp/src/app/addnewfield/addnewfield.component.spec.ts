import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewfieldComponent } from './addnewfield.component';

describe('AddnewfieldComponent', () => {
  let component: AddnewfieldComponent;
  let fixture: ComponentFixture<AddnewfieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewfieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
