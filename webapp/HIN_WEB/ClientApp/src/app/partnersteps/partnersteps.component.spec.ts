import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerstepsComponent } from './partnersteps.component';

describe('PartnerstepsComponent', () => {
  let component: PartnerstepsComponent;
  let fixture: ComponentFixture<PartnerstepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerstepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerstepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
