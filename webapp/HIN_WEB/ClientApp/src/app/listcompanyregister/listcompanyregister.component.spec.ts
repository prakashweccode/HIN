import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcompanyregisterComponent } from './listcompanyregister.component';

describe('ListcompanyregisterComponent', () => {
  let component: ListcompanyregisterComponent;
  let fixture: ComponentFixture<ListcompanyregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcompanyregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcompanyregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
