import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedbyComponent } from './createdby.component';

describe('CreatedbyComponent', () => {
  let component: CreatedbyComponent;
  let fixture: ComponentFixture<CreatedbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
