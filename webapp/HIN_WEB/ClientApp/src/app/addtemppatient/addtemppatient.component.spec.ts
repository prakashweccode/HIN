import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtemppatientComponent } from './addtemppatient.component';

describe('AddtemppatientComponent', () => {
  let component: AddtemppatientComponent;
  let fixture: ComponentFixture<AddtemppatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtemppatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtemppatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
