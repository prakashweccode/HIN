import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactgroupComponent } from './contactgroup.component';

describe('ContactgroupComponent', () => {
  let component: ContactgroupComponent;
  let fixture: ComponentFixture<ContactgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
