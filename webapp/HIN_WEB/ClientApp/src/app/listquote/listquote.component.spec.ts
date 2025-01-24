import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListquoteComponent } from './listquote.component';

describe('ListquoteComponent', () => {
  let component: ListquoteComponent;
  let fixture: ComponentFixture<ListquoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListquoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListquoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
