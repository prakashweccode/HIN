import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListvendorComponent } from './listvendor.component';

describe('ListvendorComponent', () => {
  let component: ListvendorComponent;
  let fixture: ComponentFixture<ListvendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListvendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListvendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
