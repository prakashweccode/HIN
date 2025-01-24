import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesstepsComponent } from './servicessteps.component';

describe('ServicesstepsComponent', () => {
  let component: ServicesstepsComponent;
  let fixture: ComponentFixture<ServicesstepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesstepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesstepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
