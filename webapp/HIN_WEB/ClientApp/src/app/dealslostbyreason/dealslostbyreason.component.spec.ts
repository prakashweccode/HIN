import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealslostbyreasonComponent } from './dealslostbyreason.component';

describe('DealslostbyreasonComponent', () => {
  let component: DealslostbyreasonComponent;
  let fixture: ComponentFixture<DealslostbyreasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealslostbyreasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealslostbyreasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
