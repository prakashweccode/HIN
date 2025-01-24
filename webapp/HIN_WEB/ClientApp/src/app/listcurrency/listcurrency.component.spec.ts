import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcurrencyComponent } from './listcurrency.component';

describe('ListcurrencyComponent', () => {
  let component: ListcurrencyComponent;
  let fixture: ComponentFixture<ListcurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
