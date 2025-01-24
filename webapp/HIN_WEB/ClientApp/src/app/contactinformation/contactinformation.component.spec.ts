import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactinformationComponent } from './contactinformation.component';

describe('ContactinformationComponent', () => {
  let component: ContactinformationComponent;
  let fixture: ComponentFixture<ContactinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
