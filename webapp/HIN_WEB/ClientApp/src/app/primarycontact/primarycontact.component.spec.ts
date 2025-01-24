import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimarycontactComponent } from './primarycontact.component';

describe('PrimarycontactComponent', () => {
  let component: PrimarycontactComponent;
  let fixture: ComponentFixture<PrimarycontactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimarycontactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimarycontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
