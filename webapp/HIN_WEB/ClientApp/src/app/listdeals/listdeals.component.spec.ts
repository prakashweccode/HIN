import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdealsComponent } from './listdeals.component';

describe('ListdealsComponent', () => {
  let component: ListdealsComponent;
  let fixture: ComponentFixture<ListdealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListdealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
