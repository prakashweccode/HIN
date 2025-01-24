import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListnetworkingComponent } from './listnetworking.component';

describe('ListnetworkingComponent', () => {
  let component: ListnetworkingComponent;
  let fixture: ComponentFixture<ListnetworkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListnetworkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListnetworkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
