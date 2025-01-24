import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpartnerComponent } from './listpartner.component';

describe('ListpartnerComponent', () => {
  let component: ListpartnerComponent;
  let fixture: ComponentFixture<ListpartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListpartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
