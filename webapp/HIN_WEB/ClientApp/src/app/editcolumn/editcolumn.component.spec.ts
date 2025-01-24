import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcolumnComponent } from './editcolumn.component';

describe('EditcolumnComponent', () => {
  let component: EditcolumnComponent;
  let fixture: ComponentFixture<EditcolumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcolumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcolumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
